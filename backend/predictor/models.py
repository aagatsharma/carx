from django.db import models
from users.models import User

# Create your models here.
class Car(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL,null=True, related_name='users')
    car_name = models.CharField(max_length=100)
    brand = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    vehicle_age = models.IntegerField()
    km_driven = models.IntegerField()
    seller_type = models.CharField(max_length=20)
    fuel_type = models.CharField(max_length=20)
    transmission_type = models.CharField(max_length=20)
    mileage = models.FloatField()
    engine = models.IntegerField()
    max_power = models.FloatField()
    seats = models.IntegerField()
    user_price = models.FloatField(null=True, blank=True)
    predicted_price = models.FloatField(null=True, blank=True)
    image = models.ImageField(upload_to='car_images/', null=True, blank=True)

    def __str__(self):
        return f"{self.brand} {self.model} - {self.predicted_price}"
