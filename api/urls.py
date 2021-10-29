from django.urls import path
from .views import StocksView, StocksTierView, CompanyView, CompanyDetailView, InsideofView, PricesView, UsersView, HomeView

urlpatterns = [
    path('', HomeView.as_view()),
    path('stocks/', StocksView.as_view()),
    path('stocks/<str:tier>/', StocksTierView.as_view()),
    path('users/', UsersView.as_view()),
    path('company/', CompanyView.as_view()),
    path('company/<int:pk>', CompanyDetailView.as_view()),
    path('insideof/', InsideofView.as_view()),
    path('prices/', PricesView.as_view())
]