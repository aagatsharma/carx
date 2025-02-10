import numpy as np
from collections import Counter

class DecisionTreeRegressor:
    def __init__(self, max_depth=None, min_samples_split=2):
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.root = None
        
    class Node:
        def __init__(self, feature=None, threshold=None, left=None, right=None, value=None):
            self.feature = feature      # Index of the feature to split on
            self.threshold = threshold  # Threshold value for the split
            self.left = left          # Left child node
            self.right = right        # Right child node
            self.value = value        # Prediction value for leaf nodes
    
    def fit(self, X, y):
        self.n_classes = len(np.unique(y))
        self.root = self._grow_tree(X, y, depth=0)
        
    def _grow_tree(self, X, y, depth):
        n_samples, n_features = X.shape
        
        # Check stopping criteria
        if (self.max_depth is not None and depth >= self.max_depth) or \
           n_samples < self.min_samples_split:
            return self.Node(value=np.mean(y))
            
        # Find the best split
        best_feature = None
        best_threshold = None
        best_entropy = float('inf')
        
        for feature in range(n_features):
            thresholds = np.unique(X[:, feature])
            for threshold in thresholds:
                left_mask = X[:, feature] <= threshold
                right_mask = ~left_mask
                
                if np.sum(left_mask) == 0 or np.sum(right_mask) == 0:
                    continue
                    
                left_y = y[left_mask]
                right_y = y[right_mask]
                
                # Calculate MSE for regression
                current_entropy = (np.sum((left_y - np.mean(left_y))**2) + 
                                 np.sum((right_y - np.mean(right_y))**2))
                
                if current_entropy < best_entropy:
                    best_entropy = current_entropy
                    best_feature = feature
                    best_threshold = threshold
        
        if best_feature is None:  # No valid split found
            return self.Node(value=np.mean(y))
        
        # Create child nodes
        left_mask = X[:, best_feature] <= best_threshold
        right_mask = ~left_mask
        
        left_child = self._grow_tree(X[left_mask], y[left_mask], depth + 1)
        right_child = self._grow_tree(X[right_mask], y[right_mask], depth + 1)
        
        return self.Node(feature=best_feature, threshold=best_threshold,
                        left=left_child, right=right_child)
    
    def predict(self, X):
        return np.array([self._traverse_tree(x, self.root) for x in X])
    
    def _traverse_tree(self, x, node):
        if node.value is not None:
            return node.value
            
        if x[node.feature] <= node.threshold:
            return self._traverse_tree(x, node.left)
        return self._traverse_tree(x, node.right)

class RandomForestRegressor:
    def __init__(self, n_estimators=100, max_depth=None, min_samples_split=2):
        self.n_estimators = n_estimators
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.trees = []
        
    def fit(self, X, y):
        self.trees = []
        n_samples = X.shape[0]
        
        for _ in range(self.n_estimators):
            # Bootstrap sampling
            indices = np.random.choice(n_samples, size=n_samples, replace=True)
            X_bootstrap = X[indices]
            y_bootstrap = y[indices]
            
            # Create and train a new decision tree
            tree = DecisionTreeRegressor(
                max_depth=self.max_depth,
                min_samples_split=self.min_samples_split
            )
            tree.fit(X_bootstrap, y_bootstrap)
            self.trees.append(tree)
            
    def predict(self, X):
        # Get predictions from all trees
        tree_predictions = np.array([tree.predict(X) for tree in self.trees])
        # Return mean prediction
        return np.mean(tree_predictions, axis=0)
