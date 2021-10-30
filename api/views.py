from functools import partial
from django.db import reset_queries
from django.shortcuts import render
from django.http import Http404
from rest_framework import generics, serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import StocksSerializer, CompanySerializer, InsideofSerializer, PricesSerializer, UsersSerializer
from .models import Stocks, Company, Insideof, Prices
from .permissions import IsPostOrIsAuthenticated


class StocksView(generics.ListAPIView):
    queryset = Stocks.objects.all()
    serializer_class = StocksSerializer


class StocksTierView(generics.ListAPIView):
    def get_queryset(self):
        tier = self.kwargs['tier']
        return Stocks.objects.filter(tier=tier)
    serializer_class = StocksSerializer
# test


class CompanyView(generics.ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class CompanyDetailView(APIView):
    def get_object(self, pk):
        try:
            return Company.objects.get(pk=pk)
        except Company.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        company = self.get_object(pk)
        serializers = CompanySerializer(company)
        return Response(serializers.data)


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
