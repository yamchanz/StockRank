from datetime import datetime
from functools import partial, partialmethod
from django.db import reset_queries
from django.shortcuts import render
from rest_framework import generics, serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password
from django.db import connection
from .serializers import (StocksSerializer, CompanySerializer, InsideofSerializer,
                          PricesSerializer, UsersSerializer, WatchlistSerializer,
                          BelongsToSerializer, WatchesSerializer)
from .models import Belongsto, Stocks, Company, Insideof, Prices, Watchlist, Watches
from .permissions import IsPostOrIsAuthenticated


class StocksView(APIView):
    """
    Example: http://127.0.0.1:8000/api/stocks/?tier=A
    """

    def get(self, request):
        stocks = Stocks.objects

        if "tier" in request.GET:
            stocks = stocks.filter(tier=request.GET["tier"])

        serializers = StocksSerializer(stocks, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class CompanyView(APIView):
    """
    Example: http://127.0.0.1:8000/api/company/?name=A&marketcap_gte=79400&tier=B
    """

    def get(self, request):
        companies = Company.objects

        if 'name' in request.GET:
            companies = companies.raw(
                'SELECT * FROM Company WHERE CompanyName LIKE %s', [request.GET['name'] + '%'])

        if 'sector' in request.GET:
            companies = companies.filter(
                sector__startswith=request.GET['sector'])

        if 'industry' in request.GET:
            companies = companies.filter(
                industry__startswith=request.GET['industry'])

        if 'country' in request.GET:
            companies = companies.filter(
                country__startswith=request.GET['country']
            )

        if 'marketcap_gte' in request.GET:
            companies = companies.filter(
                marketcap__gte=request.GET['marketcap_gte']
            )

        if 'marketcap_lte' in request.GET:
            companies = companies.filter(
                marketcap__lte=request.GET['marketcap_lte']
            )

        if 'tier' in request.GET:
            company_ids = companies.values_list('companyid')
            satisfied_company_ids = Stocks.objects.filter(
                companyid__in=company_ids).filter(tier=request.GET['tier']).values_list('companyid', flat=True)
            companies = companies.filter(companyid__in=satisfied_company_ids)

        if 'revenue_gte' in request.GET:
            company_ids = companies.values_list('companyid')
            satisfied_company_ids = Stocks.objects.filter(
                companyid__in=company_ids).filter(yoyrevenue__gte=request.GET['revenue_gte']).values_list('companyid', flat=True)
            companies = companies.filter(companyid__in=satisfied_company_ids)

        if 'ps_lte' in request.GET:
            company_ids = companies.values_list('companyid')
            satisfied_company_ids = Stocks.objects.filter(
                companyid__in=company_ids).filter(ps__lte=request.GET['ps_lte']).values_list('companyid', flat=True)
            companies = companies.filter(companyid__in=satisfied_company_ids)

        if 'margins_gte' in request.GET:
            company_ids = companies.values_list('companyid')
            satisfied_company_ids = Stocks.objects.filter(
                companyid__in=company_ids).filter(grossmargins__gte=request.GET['margins_gte']).values_list('companyid', flat=True)
            companies = companies.filter(companyid__in=satisfied_company_ids)

        if 'rec_lte' in request.GET:
            company_ids = companies.values_list('companyid')
            satisfied_company_ids = Stocks.objects.filter(
                companyid__in=company_ids).filter(recommendationmean__lte=request.GET['rec_lte']).values_list('companyid', flat=True)
            companies = companies.filter(companyid__in=satisfied_company_ids)

        serializers = CompanySerializer(companies, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class UsersView(APIView):
    permission_classes = [IsPostOrIsAuthenticated]

    def remove_password_field(self, data: dict):
        data_without_password = {}
        data_without_password['userlogin'] = data['userlogin']
        data_without_password['firstname'] = data['firstname']
        return data_without_password

    # Create a new user
    def post(self, request):
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            with connection.cursor() as cursor:
                hashed_password = make_password(serializer.data["password"])
                cursor.execute("INSERT INTO Users (password, last_login,"
                               " is_superuser, UserLogin, FirstName,"
                               " is_staff, is_active) VALUES"
                               " (%s, %s, %s, %s, %s, %s, %s)",
                               [hashed_password, None, False,
                                serializer.data["userlogin"],
                                serializer.data["firstname"], False, True])

            return Response(self.remove_password_field(serializer.data),
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Request current user
    def get(self, request):
        user = request.user
        if not user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializers = UsersSerializer(user)
        return Response(serializers.data, status=status.HTTP_200_OK)

    # Update an existing user
    def put(self, request):
        user = request.user
        if not user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        print(request.data)
        serializers = UsersSerializer(
            instance=user, data=request.data, partial=True)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    # Delete an existing user
    def delete(self, request):
        user = request.user
        if not user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        op_success = user.delete()
        if op_success:
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class WatchlistView(APIView):
    permission_classes = [IsAuthenticated]

    # Add entry to BelongsTo table when creating new watchlists
    def setup_belongs_to(self, watchlistid, userlogin):
        belongsTo_data = {'watchlistid': watchlistid,
                          'userlogin': userlogin}
        belongsTo_serializer = BelongsToSerializer(data=belongsTo_data)
        if belongsTo_serializer.is_valid():
            belongsTo_serializer.save()

    # Request watchlists belongs to current user
    def get(self, request):
        user = request.user
        if not user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        watchlist_ids = Belongsto.objects.filter(
            userlogin=user.pk).values_list('watchlistid')
        watchlists = Watchlist.objects.filter(watchlistid__in=watchlist_ids)
        watchlist_serializer = WatchlistSerializer(
            instance=watchlists, many=True)
        return Response(watchlist_serializer.data, status=status.HTTP_200_OK)

    # Create a watchlist
    def post(self, request):
        user = request.user
        if not user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        data = request.data
        data['datecreated'] = datetime.now()
        watchlist_serializer = WatchlistSerializer(data=request.data)

        if watchlist_serializer.is_valid():
            watchlist_serializer.save()

            self.setup_belongs_to(
                watchlist_serializer.data['watchlistid'], user.get_username())

            return Response(watchlist_serializer.data, status=status.HTTP_201_CREATED)
        return Response(watchlist_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

     # Update a watchlist
    def put(self, request):
        user = request.user
        if not user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        watchlist_id = request.data['watchlistid']
        if not watchlist_id:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # TODO: fill body
        print(request.data)
        watchlist = Watchlist.objects.filter(pk=watchlist_id)
        print(watchlist)
        serializers = WatchlistSerializer(
            instance=watchlist[0], data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    # Delete a watchlist
    def delete(self, request):
        user = request.user
        if not user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        watchlist_id = request.data['watchlistid']
        if not watchlist_id:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        watchlist = Watchlist.objects.filter(pk=watchlist_id)[0]
        op_success = watchlist.delete()
        if op_success:
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)

        # TODO: fill body


class WatchesView(APIView):
    permission_classes = [IsAuthenticated]

    # Request watchlist data
    def get(self, request):
        user = request.user
        if not user:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        watches = Watches.objects
        if "watchlistid" in request.GET:
            watches = watches.filter(watchlistid=request.GET["watchlistid"])

        serializer = WatchesSerializer(watches, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Create an entry
    def post(self, request):
        user = request.user
        if not user:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = WatchesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete an entry
    def delete(self, request):
        user = request.user
        if not user:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # TODO: fill body
        return Response(status=status.HTTP_200_OK)


class InsideofView(generics.ListAPIView):
    queryset = Insideof.objects.all()
    serializer_class = InsideofSerializer


class PricesView(generics.ListAPIView):
    """
    Example: http://127.0.0.1:8000/api/prices/?ticker=TSLA
    """

    def get(self, request):
        prices = Prices.objects

        if "ticker" in request.GET:
            prices = prices.filter(tickersymbol=request.GET["ticker"])

        serializers = PricesSerializer(prices, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class HomeView(APIView):
    def get(self, _):
        return Response({"welcome": "Hello from Django, you've hit the backend API"})


class BlacklistTokenView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
