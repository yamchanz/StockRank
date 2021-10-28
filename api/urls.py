from django.urls import path
from .views import StocksView, CompanyView, CompanyDetailView, InsideofView, PricesView, HomeView

urlpatterns = [
    path('', HomeView.as_view()),
    path('stocks/', StocksView.as_view()),
    path('company/', CompanyView.as_view()),
    path('company/<int:pk>', CompanyDetailView.as_view()),
    path('insideof/', InsideofView.as_view()),
    path('prices/', PricesView.as_view())
]