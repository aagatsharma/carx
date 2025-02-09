from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager,PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Create and return a regular user with an email and password."""
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and return a superuser with an email and password."""
        extra_fields.setdefault("role", "admin")  # Set default role as admin for superuser
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)
        return self.create_user(email, password, **extra_fields)
    

# Create your models here.
class User(AbstractUser,PermissionsMixin):
    class Role(models.TextChoices):
        ADMIN = 'admin', 'Admin'
        NORMAL = 'normal', 'Normal'
        
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255,unique=True)
    password = models.CharField(max_length=255)
    role = models.CharField(
        max_length=6,
        choices=Role.choices,
        default=Role.NORMAL,  
    )
    username = None
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    
    objects = CustomUserManager()
    