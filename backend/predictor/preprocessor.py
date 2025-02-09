from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder
from sklearn.compose import ColumnTransformer
import pandas as pd

def get_feature_names():
    # These must exactly match the feature names used during training
    return [
        'onehot__seller_type_Individual',
        'onehot__seller_type_Trustmark Dealer',
        'onehot__fuel_type_Diesel',
        'onehot__fuel_type_Electric',
        'onehot__fuel_type_LPG',
        'onehot__fuel_type_Petrol',
        'onehot__transmission_type_Manual',
        'ordinal__car_name',
        'ordinal__brand',
        'ordinal__model',
        'remainder__vehicle_age',
        'remainder__km_driven',
        'remainder__mileage',
        'remainder__engine',
        'remainder__max_power',
        'remainder__seats'
    ]

