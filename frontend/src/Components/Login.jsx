import { useState } from "react";

import loginimg from "../assets/loginimg.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./auth-provider";
const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      login(response.user);
      navigate("/");
    } catch (error) {
      setError("Failed to submit form. Please try again.");
      console.error("Error:", error);
    }
  };

  if (!user)
    return (
      <div className="h-screen flex">
        <div
          className="hidden lg:flex w-full lg:w-1/2 justify-around items-center bg-cover bg-center bg-gradient-to-t from-black via-transparent to-black"
          style={{
            // backgroundImage: 'url(https://i.pinimg.com/736x/79/ed/66/79ed669ee3285db9d2ea88a717c88f22.jpg)',
            backgroundImage: `url(${loginimg})`,
          }}
        ></div>
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
          <div className="w-full px-8 md:px-32 lg:px-24">
            <form
              className="bg-white rounded-md shadow-2xl p-5"
              onSubmit={handleSubmit}
            >
              <h1 className="text-gray-800 font-bold text-2xl mb-1">
                Hello Again!
              </h1>
              <p className="text-sm font-normal text-gray-600 mb-8">
                Welcome Back
              </p>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  id="email"
                  className="pl-2 w-full outline-none border-none"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                  placeholder="Email Address"
                />
              </div>
              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="pl-2 w-full outline-none border-none"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                  placeholder="Password"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="block w-full bg-red-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
              >
                Login
              </button>

              <Link to={"/signup"} className="my-2">
                Don&apos;t have an account?
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Login;
