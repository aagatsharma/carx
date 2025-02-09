import React, { createContext, useState, useContext, useEffect } from "react";

// Create an Auth context
const AuthContext = createContext<any>(null);

// Custom hook to use Auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Simulate login (you can replace this with an API call)
  const login = async (userData: any) => {
    // Example: store user info and token in localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Simulate logout (clear localStorage and state)
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Check if user is already logged in when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    // Only parse JSON if the stored value exists and is valid JSON
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
        localStorage.removeItem("user"); // Clear invalid data
      }
    }
    setLoading(false);
  }, []);

  // Auth provider value
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
