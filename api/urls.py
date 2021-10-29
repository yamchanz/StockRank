from django.urls import path
from .views import (StocksView, StocksTierView, CompanyView, CompanyDetailView,
    InsideofView, PricesView, UsersRegistrationView, HomeView,
    WatchListView, BlacklistTokenView)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', HomeView.as_view()),
    path('stocks/', StocksView.as_view()),
    path('stocks/<str:tier>/', StocksTierView.as_view()),
    path('users/registration/', UsersRegistrationView.as_view()),
    path('company/', CompanyView.as_view()),
    path('company/<int:pk>/', CompanyDetailView.as_view()),
    path('insideof/', InsideofView.as_view()),
    path('prices/', PricesView.as_view()),
    path('watchlist/', WatchListView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', BlacklistTokenView.as_view(), name='blacklist')
]