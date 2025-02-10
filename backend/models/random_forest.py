import numpy as np
from decision_tree import DecisionTreeRegressor

class RandomForestRegressor:
    def __init__(self, n_estimators=100, max_depth=None, min_samples_split=2, max_features='sqrt'):
        self.n_estimators = n_estimators
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.max_features = max_features
        self.trees = []
        
    def _bootstrap_sample(self, X, y):
        """Create a bootstrap sample."""
        n_samples = X.shape[0]
        idxs = np.random.choice(n_samples, size=n_samples, replace=True)
        return X[idxs], y[idxs]
    
    def _get_max_features(self, n_features):
        """Calculate number of features to consider at each split."""
        if isinstance(self.max_features, str):
            if self.max_features == 'sqrt':
                return int(np.sqrt(n_features))
            elif self.max_features == 'log2':
                return int(np.log2(n_features))
        elif isinstance(self.max_features, float):
            return int(self.max_features * n_features)
        elif isinstance(self.max_features, int):
            return self.max_features
        return n_features
    
    def fit(self, X, y):
        """Build the random forest."""
        n_features = X.shape[1]
        self.feature_subset_size = self._get_max_features(n_features)
        
        # Create trees
        for _ in range(self.n_estimators):
            # Bootstrap sample
            X_sample, y_sample = self._bootstrap_sample(X, y)
            
            # Create and train tree
            tree = DecisionTreeRegressor(
                max_depth=self.max_depth,
                min_samples_split=self.min_samples_split
            )
            
            # Randomly select features for this tree
            feature_idxs = np.random.choice(n_features, 
                                          size=self.feature_subset_size, 
                                          replace=False)
            tree.fit(X_sample[:, feature_idxs], y_sample)
            
            # Store the tree and its feature indices
            self.trees.append((tree, feature_idxs))
            
        return self
    
    def predict(self, X):
        """Predict target values."""
        # Get predictions from all trees
        predictions = np.zeros((X.shape[0], len(self.trees)))
        
        for i, (tree, feature_idxs) in enumerate(self.trees):
            predictions[:, i] = tree.predict(X[:, feature_idxs])
            
        # Return mean prediction
        return np.mean(predictions, axis=1)