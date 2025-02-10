import numpy as np

class DecisionTreeRegressor:
    def __init__(self, max_depth=None, min_samples_split=2):
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.tree = None
        
    def _calculate_variance(self, y):
        """Calculate variance of target values."""
        return np.var(y) if len(y) > 0 else 0
    
    def _best_split(self, X, y):
        """Find the best split for a node."""
        m = X.shape[0]
        if m <= self.min_samples_split:
            return None, None
            
        # Calculate current variance
        parent_var = self._calculate_variance(y)
        
        best_var = parent_var
        best_criteria = None
        best_sets = None
        
        # For each feature
        for feature_idx in range(X.shape[1]):
            feature_values = X[:, feature_idx]
            unique_values = np.unique(feature_values)
            
            # For each value in feature
            for threshold in unique_values:
                # Split the data
                left_mask = feature_values <= threshold
                right_mask = ~left_mask
                
                if np.sum(left_mask) == 0 or np.sum(right_mask) == 0:
                    continue
                
                # Calculate weighted variance
                left_var = self._calculate_variance(y[left_mask])
                right_var = self._calculate_variance(y[right_mask])
                n_left, n_right = np.sum(left_mask), np.sum(right_mask)
                weighted_var = (n_left * left_var + n_right * right_var) / m
                
                if weighted_var < best_var:
                    best_var = weighted_var
                    best_criteria = (feature_idx, threshold)
                    best_sets = (
                        (X[left_mask], y[left_mask]),
                        (X[right_mask], y[right_mask])
                    )
        
        return best_criteria, best_sets
    
    def _build_tree(self, X, y, depth=0):
        """Recursively build the decision tree."""
        n_samples = X.shape[0]
        
        # Check stopping criteria
        if (self.max_depth is not None and depth >= self.max_depth) or \
           n_samples < self.min_samples_split:
            return np.mean(y)
            
        # Find the best split
        best_criteria, best_sets = self._best_split(X, y)
        
        if best_criteria is None:
            return np.mean(y)
            
        # Create child nodes
        feature_idx, threshold = best_criteria
        left_tree = self._build_tree(best_sets[0][0], best_sets[0][1], depth + 1)
        right_tree = self._build_tree(best_sets[1][0], best_sets[1][1], depth + 1)
        
        return {
            'feature_idx': feature_idx,
            'threshold': threshold,
            'left': left_tree,
            'right': right_tree
        }
    
    def fit(self, X, y):
        """Build the decision tree."""
        self.tree = self._build_tree(X, y)
        return self
    
    def _predict_single(self, x, tree):
        """Predict for a single sample."""
        if not isinstance(tree, dict):
            return tree
            
        if x[tree['feature_idx']] <= tree['threshold']:
            return self._predict_single(x, tree['left'])
        return self._predict_single(x, tree['right'])
    
    def predict(self, X):
        """Predict target values."""
        return np.array([self._predict_single(x, self.tree) for x in X])
