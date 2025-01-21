import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../Redux/Slices/authSlice";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginRequest());

    try {
      const { data } = await axios.post(
        "https://book-app-backend-6b6f.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      if (data.token) {
        dispatch(loginSuccess(data));
        navigate("/getall");
      } else {
        dispatch(loginFailure("No token received"));
      }
    } catch (err) {
      dispatch(
        loginFailure(err.response?.data?.message || "Something went wrong")
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="flex w-11/12 max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Section: Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 top-5 flex items-center text-gray-600 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" /> Loading...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <div className="text-center mt-4">
              <span>Forgot Password? </span>
              <Link to="/forgot" className="text-blue-500 hover:underline">
                Click Here
              </Link>
            </div>
          </form>
        </div>

        {/* Right Section: Image */}
        <div className="hidden md:block w-1/2 bg-gradient-to-tr from-blue-500 to-purple-50 relative">
          <img
            src="https://i.pinimg.com/236x/0c/9b/89/0c9b89b62ba04b4b4740f4ce2da28b54.jpg"
            alt="login"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
