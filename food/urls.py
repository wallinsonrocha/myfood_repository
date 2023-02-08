from django.urls import include, path
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView, TokenVerifyView)

from . import views

app_name = 'food'

food_api_router = SimpleRouter()
food_api_router.register(
    'api/food',
    views.FoodAPIViewSet,
    basename='food-api',
)

ctg_api_router = SimpleRouter()
ctg_api_router.register(
    'api/category',
    views.CategoryAPIViewSet,
    basename='ctg-api',
)

urlpatterns = [
    # path('jwt/api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('jwt/api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('jwt/api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('', views.home, name="home"),
    path('confirmation/', views.address, name="confirmation"),
    path('', include(food_api_router.urls)),
    path('', include(ctg_api_router.urls)),
]