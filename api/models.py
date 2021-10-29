from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from rest_framework.fields import is_simple_callable


class Belongsto(models.Model):
    userlogin = models.ForeignKey(
        'Users', models.DO_NOTHING, db_column='UserLogin')
    watchlistid = models.OneToOneField(
        'Watchlist', models.DO_NOTHING, db_column='WatchlistID', primary_key=True)

    class Meta:
        managed = False
        db_table = 'BelongsTo'


class Company(models.Model):
    companyid = models.IntegerField(db_column='CompanyID', primary_key=True)
    companyname = models.CharField(
        db_column='CompanyName', max_length=500, blank=True, null=True)
    sector = models.CharField(
        db_column='Sector', max_length=500, blank=True, null=True)
    industry = models.CharField(
        db_column='Industry', max_length=500, blank=True, null=True)
    country = models.CharField(
        db_column='Country', max_length=500, blank=True, null=True)
    marketcap = models.FloatField(db_column='MarketCap', blank=True, null=True)
    companydescription = models.CharField(
        db_column='CompanyDescription', max_length=5000, blank=True, null=True)
    logo = models.CharField(
        db_column='Logo', max_length=500, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Company'


class Exchange(models.Model):
    exchangename = models.CharField(
        db_column='ExchangeName', primary_key=True, max_length=100)
    exchangelocation = models.CharField(
        db_column='ExchangeLocation', max_length=100, blank=True, null=True)
    timezone = models.CharField(
        db_column='TimeZone', max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Exchange'


class Filters(models.Model):
    userlogin = models.OneToOneField(
        'Users', models.DO_NOTHING, db_column='UserLogin', primary_key=True)
    stockfilter = models.CharField(db_column='StockFilter', max_length=100)

    class Meta:
        managed = False
        db_table = 'Filters'
        unique_together = (('userlogin', 'stockfilter'),)


class Insideof(models.Model):
    tickersymbol = models.OneToOneField(
        'Stocks', models.DO_NOTHING, db_column='TickerSymbol', primary_key=True)
    exchangename = models.ForeignKey(
        Exchange, models.DO_NOTHING, db_column='ExchangeName')

    class Meta:
        managed = False
        db_table = 'InsideOf'
        unique_together = (('tickersymbol', 'exchangename'),)


class Prices(models.Model):
    tickersymbol = models.OneToOneField(
        'Stocks', models.DO_NOTHING, db_column='TickerSymbol', primary_key=True)
    pricedate = models.DateTimeField(db_column='PriceDate')
    openprice = models.FloatField(db_column='OpenPrice', blank=True, null=True)
    closeprice = models.FloatField(
        db_column='ClosePrice', blank=True, null=True)
    volume = models.IntegerField(db_column='Volume', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Prices'
        unique_together = (('tickersymbol', 'pricedate'),)


class Ranking(models.Model):
    tier = models.CharField(db_column='Tier', primary_key=True, max_length=2)
    percentile = models.FloatField(
        db_column='Percentile', blank=True, null=True)
    color = models.CharField(
        db_column='Color', max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Ranking'


class Stocks(models.Model):
    tickersymbol = models.CharField(
        db_column='TickerSymbol', primary_key=True, max_length=10)
    companyid = models.ForeignKey(
        Company, models.DO_NOTHING, db_column='CompanyID')
    tier = models.ForeignKey(Ranking, models.DO_NOTHING, db_column='Tier')
    yoyrevenue = models.FloatField(
        db_column='YoYRevenue', blank=True, null=True)
    ps = models.FloatField(db_column='PS', blank=True, null=True)
    grossmargins = models.FloatField(
        db_column='GrossMargins', blank=True, null=True)
    totalcash = models.FloatField(db_column='TotalCash', blank=True, null=True)
    totaldebt = models.FloatField(db_column='TotalDebt', blank=True, null=True)
    ebitda = models.FloatField(db_column='EBITDA', blank=True, null=True)
    recommendationmean = models.FloatField(
        db_column='RecommendationMean', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Stocks'


class UsersManager(BaseUserManager):
    def create_user(self, userlogin, password, firstname, **other_fields):
        if not userlogin:
            raise ValueError(_('You must provide an user login'))
        user = self.model(userlogin=userlogin, password=password,
                          firstname=firstname, **other_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, userlogin, password, firstname, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_active', True)
        other_fields.setdefault('is_superuser', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True'))

        if other_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True'))

        return self.create_user(userlogin, password, firstname, **other_fields)


class Users(AbstractBaseUser, PermissionsMixin):
    userlogin = models.CharField(
        db_column='UserLogin', primary_key=True, max_length=100)
    firstname = models.CharField(
        db_column='FirstName', max_length=100, blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'userlogin'
    REQUIRED_FIELDS = ['firstname']

    objects = UsersManager()

    def __str__(self):
        return self.userlogin

    class Meta:
        db_table = 'Users'


class Watches(models.Model):
    watchlistid = models.OneToOneField(
        'Watchlist', models.DO_NOTHING, db_column='WatchlistID', primary_key=True)
    tickersymbol = models.ForeignKey(
        Stocks, models.DO_NOTHING, db_column='TickerSymbol')

    class Meta:
        managed = False
        db_table = 'Watches'
        unique_together = (('watchlistid', 'tickersymbol'),)


class Watchlist(models.Model):
    watchlistid = models.IntegerField(
        db_column='WatchlistID', primary_key=True)
    watchlistname = models.CharField(
        db_column='WatchlistName', max_length=100, blank=True, null=True)
    datecreated = models.DateTimeField(
        db_column='DateCreated', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Watchlist'
