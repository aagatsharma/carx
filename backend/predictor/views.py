import pickle
import pandas as pd
import numpy as np
from rest_framework import views
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import os
from .preprocessor import get_feature_names
from .serializers import CarInputSerializer,CarSerializer,CarViewSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Car
from rest_framework.exceptions import AuthenticationFailed
import jwt
from django.shortcuts import get_object_or_404
from users.models import User


class PredictPriceView(views.APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Load the model
        model_path = "predictor/models/random_forest_regressor.pkl"
        with open(model_path, 'rb') as file:
            self.model = pickle.load(file)
        
        self.feature_names = get_feature_names()
    
    def preprocess_input(self, data):
        # Manual preprocessing to match the expected features
        processed = []
        
        # Seller type one-hot encoding
        processed.append(1.0 if data['seller_type'] == 'Individual' else 0.0)
        processed.append(1.0 if data['seller_type'] == 'Dealer' else 0.0)
        
        # Fuel type one-hot encoding
        processed.append(1.0 if data['fuel_type'] == 'Diesel' else 0.0)
        processed.append(1.0 if data['fuel_type'] == 'Electric' else 0.0)
        processed.append(1.0 if data['fuel_type'] == 'LPG' else 0.0)
        processed.append(1.0 if data['fuel_type'] == 'Petrol' else 0.0)
        
        # Transmission type one-hot encoding
        processed.append(1.0 if data['transmission_type'] == 'Manual' else 0.0)
        # processed.append(1.0 if data['transmission_type'] == 'Automatic' else 0.0)

        
        # Ordinal encoding (using simple numerical encoding for demonstration)
        processed.append(float(hash(data['car_name']) % 100))  # car_name
        processed.append(float(hash(data['brand']) % 30))      # brand
        processed.append(float(hash(data['model']) % 100))     # model
        
        # Numerical features
        processed.extend([
            float(data['vehicle_age']),
            float(data['km_driven']),
            float(data['mileage']),
            float(data['engine']),
            float(data['max_power']),
            float(data['seats'])
        ])
        
        return processed
    
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        user_id = request.data['user_id']
        user = User.objects.filter(id=user_id).first()
        if user is None:
            raise AuthenticationFailed("User Not Found")
        

        serializer = CarInputSerializer(data=request.data)
        
        if serializer.is_valid():
            try:
                # Extract the image if provided
                image = request.FILES.get('image', None)

                # Preprocess the input data
                processed_data = self.preprocess_input(serializer.validated_data)
                
                # Convert to DataFrame with correct feature names
                processed_df = pd.DataFrame([processed_data], columns=self.feature_names)
                
                # Make prediction
                prediction = self.model.predict(processed_df)[0]

                # Save the car data, including the predicted price and image
                car = Car.objects.create(
                    user=user,
                    car_name=serializer.validated_data['car_name'],
                    brand=serializer.validated_data['brand'],
                    model=serializer.validated_data['model'],
                    vehicle_age=serializer.validated_data['vehicle_age'],
                    km_driven=serializer.validated_data['km_driven'],
                    seller_type=serializer.validated_data['seller_type'],
                    fuel_type=serializer.validated_data['fuel_type'],
                    transmission_type=serializer.validated_data['transmission_type'],
                    mileage=serializer.validated_data['mileage'],
                    engine=serializer.validated_data['engine'],
                    max_power=serializer.validated_data['max_power'],
                    seats=serializer.validated_data['seats'],
                    predicted_price=round(prediction, 2),
                    image=image  # Save the image if provided
                )
                
                return Response({
                    'predicted_price': round(prediction, 2),
                    'message': 'Success',
                    'car_id': car.id  # Optionally return the created car ID
                }, status=status.HTTP_200_OK)
                
            except Exception as e:
                return Response({
                    'error': str(e),
                    'message': 'Prediction failed'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class ListCarView(views.APIView):
    def get(self, request):
        cars = Car.objects.all()  # Fetch all cars
        serializer = CarSerializer(cars, many=True)  # Serialize data
        return Response({
            'cars': serializer.data 
        })
        
class CarDetailView(views.APIView):
    def get(self, request, car_id):
        
        # Serialize car data
        car = Car.objects.filter(id=car_id).first()
        print(car)
        
        if car is None:
            return Response({
            'error': 'Car Not Found' 
        })
            
        serializer = CarViewSerializer(car)
        
        # Return response with car details
        return Response({
            'cars': serializer.data 
        })
