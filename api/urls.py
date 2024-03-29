from django.urls import path
from .views import (StocksView, CompanyView, ProcedureView,
                    InsideofView, PricesView, UsersView, HomeView,
                    WatchlistView, WatchesView, BlacklistTokenView)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', HomeView.as_view()),
    path('stocks/', StocksView.as_view()),
    path('users/', UsersView.as_view()),
    path('company/', CompanyView.as_view()),
    path('insideof/', InsideofView.as_view()),
    path('prices/', PricesView.as_view()),
    path('watchlist/', WatchlistView.as_view()),
    path('watches/', WatchesView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', BlacklistTokenView.as_view(), name='blacklist'),
    path('procedure/', ProcedureView.as_view())
]
