# accounts/urls.py
from django.urls import path
from .views import (
    RegisterView, LoginView, LogoutView, 
    ChangePasswordView, PasswordResetRequestView,
    UserProfileView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('reset-password-request/', PasswordResetRequestView.as_view(), name='reset-password-request'),
    path('profile/', UserProfileView.as_view(), name='profile'),
]