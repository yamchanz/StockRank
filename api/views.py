from django.shortcuts import render
from rest_framework import generics
from .serializers import StocksSerializer, CompanySerializer, InsideofSerializer, PricesSerializer
from .models import Stocks, Company, Insideof, Prices

class StocksView(generics.ListAPIView):
    queryset = Stocks.objects.all()
    serializer_class = StocksSerializer

class CompanyView(generics.ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class InsideofView(generics.ListAPIView):
    queryset = Insideof.objects.all()
    serializer_class = InsideofSerializer

class PricesView(generics.ListAPIView):
    queryset = Prices.objects.all()
    serializer_class = PricesSerializer
