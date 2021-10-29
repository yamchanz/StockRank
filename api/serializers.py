from rest_framework import serializers
from .models import Stocks, Company, Insideof, Prices, Users

class StocksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stocks
        fields = ('tickersymbol', 'companyid', 'tier', 'yoyrevenue', 'ps', 
                  'grossmargins', 'totalcash', 'totaldebt', 'ebitda', 'recommendationmean')

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('companyid', 'companyname', 'sector', 'industry', 'country', 
                  'marketcap', 'companydescription', 'logo')

class InsideofSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insideof
        fields = ('tickersymbol', 'exchangename')

class PricesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prices
        fields = ('tickersymbol', 'pricedate', 'openprice', 'closeprice', 'volume')

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('userlogin', 'userpassword', 'firstname')
