from rest_framework import serializers
from .models import Car

class CarInputSerializer(serializers.Serializer):
    car_name = serializers.CharField()
    brand = serializers.CharField()
    model = serializers.CharField()
    vehicle_age = serializers.IntegerField()
    km_driven = serializers.IntegerField()
    seller_type = serializers.ChoiceField(choices=['Dealer', 'Individual', 'Dealer'])
    fuel_type = serializers.ChoiceField(choices=['Petrol', 'Diesel', 'Electric'])
    transmission_type = serializers.ChoiceField(choices=['Manual', 'Automatic'])
    mileage = serializers.FloatField()
    engine = serializers.IntegerField()
    max_power = serializers.FloatField()
    seats = serializers.IntegerField()
    # image = serializers.ImageField(required=False)
    

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id','car_name', 'predicted_price', 'image'] 
        
class CarViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'