import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../Redux/Slices/authSlice";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

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
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
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
              type={showPassword ? "text" : "password"} // Toggle between text and password
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Toggle visibility
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2 text-center" />{" "}
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
          <span>Forgot Password?</span>
          <Link
            to="/forgot"
            className="text-blue-500 hover:underline text-center"
          >
            Click Here
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
