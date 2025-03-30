from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self,username:str,email:str,password:str=None,is_staff=False,is_superuser=False,isVerified=False)->'User':
        if not username:
            raise ValueError("Username required")
        if not email:
            raise ValueError("Email required")
        
        user=self.model(email=self.normalize_email(email))
        user.username=username
        user.set_password(password)
        user.is_staff=is_staff
        user.isVerified=isVerified
        user.is_superuser=is_superuser
        
        user.save()
        return user
    
    def create_superuser(self,username:str,email:str,password:str=None,isVerified=False):
        user=self.create_user(
            username=username,
            email=email,
            password=password,
            isVerified=isVerified,
            is_staff=True,
            is_superuser=True
        )
        user.save()
        return user
        

class User(AbstractUser):
    username=models.CharField(verbose_name="username",max_length=255,unique=True)
    email=models.EmailField(verbose_name="email",max_length=255,unique=True)
    password=models.CharField(verbose_name="password",max_length=255)
    isVerified=models.BooleanField(verbose_name="isVerified",default=False)
    
    objects=UserManager()
    
    def __str__(self):
        return self.name
