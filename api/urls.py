from django.urls import path
from .views import StocksView, CompanyView, InsideofView, PricesView

urlpatterns = [
    path('stocks/', StocksView.as_view()),
    path('company/', CompanyView.as_view()),
    path('insideof/', InsideofView.as_view()),
    path('prices/', PricesView.as_view())
]