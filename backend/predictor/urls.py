from django.urls import path
from .views import PredictPriceView,ListCarView,CarDetailView

urlpatterns = [
    path('predict/', PredictPriceView.as_view(), name='predict_price'),
    path('cars/', ListCarView.as_view(), name='list_car'),
    path('cars/<int:car_id>/', CarDetailView.as_view(), name='car-detail'),
]
