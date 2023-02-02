from django.urls import path, include
from rest_framework.routers import SimpleRouter
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

app_name = 'cart'

cart_api_router = SimpleRouter()
cart_api_router.register(
    'api/cart',
    views.CartAPIViewSet,
    basename='cart-api',
)

urlpatterns = [
    path('jwt/api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('jwt/api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('jwt/api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('', include(cart_api_router.urls)),
]
