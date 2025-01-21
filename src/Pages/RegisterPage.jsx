import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  registerRequest,
  registerSuccess,
  registerFailure,
} from "../Redux/Slices/authSlice";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(registerRequest());

    try {
      const { data } = await axios.post(
        "https://book-app-backend-6b6f.onrender.com/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      dispatch(registerSuccess(data));
      navigate("/login");
    } catch (err) {
      dispatch(registerFailure(err.response.data.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="flex w-11/12 max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2">
          <img
            src="https://i.pinimg.com/236x/0c/9b/89/0c9b89b62ba04b4b4740f4ce2da28b54.jpg"
            alt="Registration Illustration"
            className="h-full w-full object-cover rounded-l-lg"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
            Create Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

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
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md shadow-lg hover:bg-blue-600 flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" /> Loading...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </div>
            <div className="text-center">
              <span>Already have an account?</span>
              <Link to="/login" className="text-blue-500 hover:underline ml-2">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
