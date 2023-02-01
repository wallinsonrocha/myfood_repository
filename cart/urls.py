from django.urls import path, include
from rest_framework.routers import SimpleRouter
from . import views

cart_api_router = SimpleRouter()
cart_api_router.register(
    'api/cart',
    views.CartAPIViewSet,
    basename='cart',
)

urlpatterns = [
    path('', include(cart_api_router.urls)),
]
