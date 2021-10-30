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
        fields = ('tickersymbol', 'pricedate',
                  'openprice', 'closeprice', 'volume')


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('userlogin', 'password', 'firstname')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        new_password = validated_data.pop('password', None)
        new_firstname = validated_data.pop('firstname', None)
        print(instance.firstname)
        print(new_firstname)
        if new_firstname is not None:
            instance.firstname = new_firstname

        if new_password is not None:
            instance.set_password(new_password)

        instance.save()
        return instance
