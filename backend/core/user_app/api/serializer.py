from rest_framework import serializers
from user_app.models import User

class UserSerializer(serializers.ModelSerializer):
    password2=serializers.CharField(style={'input-type:password'},write_only=True)
    
    class Meta:
        model=User
        fields=['username','email','password','password2','isVerified']
        extra_kwargs={'password':{"write_only":True}}
        
        
    def save(self):
            password=self.validated_data['password']
            password2=self.validated_data['password2']
            if password != password2:
                raise serializers.ValidationError("password and password2 should be same")
            
            validated_data = {
            'email': self.validated_data['email'],
            'username': self.validated_data['username'],
            'isVerified': self.validated_data.get('isVerified', False),  # Default to False if not provided
        }

            
            account=User(**validated_data)
            
            account.set_password(password)
            
            account.save()
            
            return account
                
            