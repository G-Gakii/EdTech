from django.urls import path
from user_app.api.views import RegisterUser,Logout,verifyOtp,ResendOtp,ResetPassword,CustomTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    
)
from rest_framework_simplejwt.views import (
    TokenRefreshView,  # ← import refresh view
)

urlpatterns = [
    path("register/",RegisterUser.as_view(),name="register"),
    path("verify-otp/",verifyOtp.as_view(),name="verify-otp"),
    path("resend-otp/",ResendOtp.as_view(),name='resend-otp'),
    path("login/",CustomTokenObtainPairView.as_view(), name='login'),
    path("reset-password/",ResetPassword.as_view(),name="reset-password"),
    path("logout/",Logout.as_view(),name="logout"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"), 
]
