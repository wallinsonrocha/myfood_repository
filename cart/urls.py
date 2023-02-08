from django.urls import include, path
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView, TokenVerifyView)

from . import views

app_name = 'cart'

cart_api_router = SimpleRouter()
cart_api_router.register(
    'api/cart',
    views.CartAPIViewSet,
    basename='cart-api',
)

order_api_router = SimpleRouter()
order_api_router.register(
    'api/order',
    views.OrderAPIViewSet,
    basename='order-api',
)

urlpatterns = [
    # path('jwt/api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('jwt/api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('jwt/api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('order/<int:order_id>/', views.order_process, name="order_process"),
    path('order/', views.all_orders, name="all_orders"),
    path('', include(cart_api_router.urls)),
    path('', include(order_api_router.urls)),
]
