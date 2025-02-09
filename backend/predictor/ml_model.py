import pickle
import pandas as pd
import os
from django.conf import settings

class CarPriceModel:
    def __init__(self):
        model_path = os.path.join(settings.BASE_DIR, 'predictor', 'models', 'random_forest_regressor.pkl')
        with open(model_path, 'rb') as file:
            artifacts = pickle.load(file)
            self.model = artifacts['model']
            self.preprocessor = artifacts['preprocessor']

    def predict(self, features):
        try:
            # Convert input to DataFrame
            input_data = pd.DataFrame([features])
            
            # Transform features using the fitted preprocessor
            X = self.preprocessor.transform(input_data)
            
            # Get column names
            encoded_cols = self.preprocessor.get_feature_names_out()
            X = pd.DataFrame(X, columns=encoded_cols)
            
            # Convert ordinal columns to category dtype
            ordinal_columns = X.filter(like='ordinal').columns.tolist()
            X[ordinal_columns] = X[ordinal_columns].astype('category')
            
            # Make prediction
            prediction = self.model.predict(X)[0]
            
            return round(prediction, 2)
            
        except Exception as e:
            raise Exception(f"Prediction error: {str(e)}")