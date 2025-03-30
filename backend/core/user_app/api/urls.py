from django.urls import path
from user_app.api.views import RegisterUser,Logout
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    
)

urlpatterns = [
    path("register/",RegisterUser.as_view(),name="register"),
    path("login/",TokenObtainPairView.as_view(), name='login'),
    path("logout/",Logout.as_view(),name="logout")
]
