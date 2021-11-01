from datetime import datetime
from functools import partial
from django.db import reset_queries
from django.shortcuts import render
from rest_framework import generics, serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (StocksSerializer, CompanySerializer, InsideofSerializer,
                          PricesSerializer, UsersSerializer, WatchlistSerializer,
                          BelongsToSerializer)
from .models import Belongsto, Stocks, Company, Insideof, Prices, Watchlist
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
            companies = companies.filter(
                companyname__startswith=request.GET['name'])

        if 'sector' in request.GET:
            companies = companies.filter(
                sector__startswith=request.GET['sector'])

        if 'industry' in request.GET:
            companies = companies.filter(
                industry__startswith=request.GET['industry'])

        if 'marketcap_gte' in request.GET:
            companies = companies.filter(
                marketcap__gte=request.GET['marketcap_gte']
            )

        if 'tier' in request.GET:
            company_ids = companies.values_list('companyid')
            satisfied_company_ids = Stocks.objects.filter(
                companyid__in=company_ids).filter(tier=request.GET['tier'])\
                .values_list('companyid', flat=True)
            companies = companies.filter(companyid__in=satisfied_company_ids)

        serializers = CompanySerializer(companies, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class UsersView(APIView):
    permission_classes = [IsPostOrIsAuthenticated]

    # Create a new user
    def post(self, request):
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Request current user
    def get(self, request):
        user = request.user
        if not user:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializers = UsersSerializer(user)
        return Response(serializers.data, status=status.HTTP_200_OK)

    # Update an existing user
    def put(self, request):
        user = request.user
        if not user:
            return Response(status=status.HTTP_400_BAD_REQUEST)

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
            return Response(status=status.HTTP_400_BAD_REQUEST)

        op_success = user.delete()
        if op_success:
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class WatchListView(APIView):
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
            return Response(status=status.HTTP_400_BAD_REQUEST)

        watchlist_ids = Belongsto.objects.filter(
            userlogin=user.pk).values_list('watchlistid')
        watchlists = Watchlist.objects.filter(watchlistid__in=watchlist_ids)
        watchlist_serializer = WatchlistSerializer(watchlists, many=True)
        return Response(watchlist_serializer.data, status=status.HTTP_200_OK)

    # Create a watchlist
    def post(self, request):
        user = request.user
        if not user:
            return Response(status=status.HTTP_400_BAD_REQUEST)

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
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # TODO: fill body
        return Response(status=status.HTTP_200_OK)

    # Delete a watchlist
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
    queryset = Prices.objects.all()
    serializer_class = PricesSerializer


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
