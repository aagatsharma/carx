import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import AboutUs from "./pages/AboutUS";
import Contact from "./pages/Contact";
import Predict from "./Components/Predict";
import { AuthProvider } from "./Components/auth-provider";
import Cars from "./Components/cars";
import CarDetail from "./pages/CarDetail";
function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<CarDetail />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
