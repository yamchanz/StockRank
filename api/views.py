from functools import partial
from django.db import reset_queries
from django.shortcuts import render
from rest_framework import generics, serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import StocksSerializer, CompanySerializer, InsideofSerializer, PricesSerializer, UsersSerializer
from .models import Stocks, Company, Insideof, Prices
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
    Example: http://127.0.0.1:8000/api/company/?name=Ap&marketcap_gte=7940000
    """

    def get(self, request):
        companies = Company.objects

        if "name" in request.GET:
            companies = companies.filter(
                companyname__startswith=request.GET["name"])

        if "sector" in request.GET:
            companies = companies.filter(
                sector__startswith=request.GET["sector"])

        if "industry" in request.GET:
            companies = companies.filter(
                industry__startswith=request.GET["industry"])

        if "marketcap_gte" in request.GET:
            companies = companies.filter(
                marketcap__gte=request.GET["marketcap_gte"]
            )

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

    def get(self, request):
        return Response({"protected": "Hi " + request.user.get_username() + ", here is your watchlist"})


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
