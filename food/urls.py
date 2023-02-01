from django.urls import path, include
from rest_framework.routers import SimpleRouter
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

app_name = 'food'

food_api_router = SimpleRouter()
food_api_router.register(
    'api/food',
    views.FoodAPIViewSet,
    basename='food-api',
)

urlpatterns = [
    path('jwt/api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('jwt/api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('jwt/api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('', include(food_api_router.urls)),
]