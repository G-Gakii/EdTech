from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager
from django.utils.timezone import now
from datetime import timedelta
from django.core.mail import send_mail
import random
from dotenv import load_dotenv
import os


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
            password=None,
            isVerified=True,
            is_staff=True,
            is_superuser=True
        )
        if password:
            user.set_password(password)
        user.save()
        return user
    def generate_otp_and_send_mail(self,user:'User'):
        otp=str(random.randint(100000,999999))
        user.otp=otp
        user.otp_expiration=now()+timedelta(minutes=5)
        user.save()
        
        send_mail(
            subject="Verification Code",
            message=f" Hello, {user.username}.Your otp is {otp}.it expires in 5 minutes",
            from_email=os.environ.get('EMAIL'),
            recipient_list=[user.email]
        )
        
        print(os.environ.get('EMAIL'))
        
        

class User(AbstractUser):
    id=models.UUIDField(verbose_name=id,primary_key=True,unique=True)
    username=models.CharField(verbose_name="username",max_length=255,unique=True)
    email=models.EmailField(verbose_name="email",max_length=255,unique=True)
    password=models.CharField(verbose_name="password",max_length=255)
    isVerified=models.BooleanField(verbose_name="isVerified",default=False)
    otp=models.CharField(verbose_name="OTP",max_length=6,blank=True,null=True)
    otp_expiration=models.DateTimeField(verbose_name="OTP Expiration",blank=True,null=True)
    
    objects=UserManager()
    
    def __str__(self):
        return self.username
