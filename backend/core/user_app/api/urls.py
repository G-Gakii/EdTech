from django.urls import path
from user_app.api.views import RegisterUser,Logout,verifyOtp,ResendOtp,ResetPassword
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    
)

urlpatterns = [
    path("register/",RegisterUser.as_view(),name="register"),
    path("verify-otp/<int:id>/",verifyOtp.as_view(),name="verify-otp"),
    path("resend-otp/<int:id>/",ResendOtp.as_view(),name='resend-otp'),
    path("login/",TokenObtainPairView.as_view(), name='login'),
    path("reset-password/<int:id>/",ResetPassword.as_view(),name="reset-password"),
    path("logout/",Logout.as_view(),name="logout")
]
