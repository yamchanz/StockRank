from django.shortcuts import render
from django.http import Http404
from rest_framework import generics, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import StocksSerializer, CompanySerializer, InsideofSerializer, PricesSerializer
from .models import Stocks, Company, Insideof, Prices

class StocksView(generics.ListAPIView):
    queryset = Stocks.objects.all()
    serializer_class = StocksSerializer

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


class InsideofView(generics.ListAPIView):
    queryset = Insideof.objects.all()
    serializer_class = InsideofSerializer

class PricesView(generics.ListAPIView):
    queryset = Prices.objects.all()
    serializer_class = PricesSerializer

class HomeView(APIView):
    def get(self, _):
        return Response({"welcome": "Hello from Django, you've hit the backend API"})