from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from user_app.api.serializer import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from user_app.models import User
from django.utils.timezone import now
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import serializers
from rest_framework import permissions






class RegisterUser(APIView):
    def post(self,request):
        serializer=UserSerializer(data=request.data)
        data={
            
        }
        if serializer.is_valid():
           account= serializer.save()
           
           User.objects.generate_otp_and_send_mail(account)
           
           data['response']="registered successfully"
           data['username']=account.username
           data['email']=account.email
           data['isVerified']=account.isVerified
           
           refresh = RefreshToken.for_user(account)
           data['access']=str(refresh.access_token)
           data['refresh']=str(refresh)
           
           return Response(data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
class verifyOtp(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
       
        otp=request.data.get('otp')
        
        try:
            user = request.user
            if user.otp == otp and user.otp_expiration > now():
                user.isVerified=True
                user.otp=None
                user.otp_expiration=None
                user.save()
                return Response({"message":"Email verified successfully"},status=status.HTTP_200_OK)
            else:
                return Response({"error":"Invalid or expired OTP"},status=status.HTTP_400_BAD_REQUEST)
        except:
           return Response({"error","User not found"},status=status.HTTP_400_BAD_REQUEST)
    
    
class ResendOtp(APIView):
    permission_classes = [IsAuthenticated]   
    def post(self,request):
        try:
           user=request.user
           if user.isVerified:
               return Response({"message":"you are already verified"},status=status.HTTP_200_OK)
           User.objects.generate_otp_and_send_mail(user)
           return Response({"message":"A new otp has been sent to your email"},status=status.HTTP_200_OK)
        except:
          return Response({"error","User not found"},status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
       data=super().validate(attrs)
       user=self.user
       if not user.isVerified:
           raise serializers.ValidationError({"error":"User is not verified"})
       return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
   
            
        
class ResetPassword(APIView):
    permission_classes = [IsAuthenticated]   
    def post(self,request):
        password=request.data.get('password')
        try:
            user=request.user
            if user:
                user.set_password(password)
                user.save()
                return Response({"message":"Password reset successfully "},status=status.HTTP_200_OK)
            else:
                return Response({"error":"User not found"},status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"error:something went wrong"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    
class Logout(APIView):
        permission_classes = [IsAuthenticated]
        def post(self, request):
            try:
                refresh_token = request.data.get("refresh")
                token = RefreshToken(refresh_token)
                # remove the access token and blacklist access token
                token.blacklist()
                return Response({"message":"you have logged out"},status=status.HTTP_200_OK)
                
            except AttributeError:
                return Response({"error":"Token not found"})
            