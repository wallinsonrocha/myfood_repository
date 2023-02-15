from django.urls import path
from rest_framework_simplejwt.views import TokenVerifyView

from . import views
from .views import CookieTokenObtainPairView  # Import the above views
from .views import CookieTokenRefreshView, LogoutView

urlpatterns = [
    path('auth/token/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('login/', views.login, name="login")
]
