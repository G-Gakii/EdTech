from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from user_app.api.serializer import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated


class RegisterUser(APIView):
    def post(self,request):
        serializer=UserSerializer(data=request.data)
        data={
            
        }
        if serializer.is_valid():
           account= serializer.save()
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
        
        
class Logout(APIView):
        permission_classes = [IsAuthenticated]
        def post(self, request):
            try:
                refresh_token = request.data.get("refresh")
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response({"message":"you have logged out"},status=status.HTTP_200_OK)
                
            except AttributeError:
                return Response({"error":"Token not found"})
            