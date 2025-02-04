import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://book-app-backend-6b6f.onrender.com/api/auth/forgotPassword",
        { email }
      );

      setMessage(response.data.message);
      setError("");
      setLoading(false);

      const { token } = response.data;
      if (token) {
        setTimeout(() => {
          navigate(`/reset-password/${token}`);
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setMessage("");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 px-4 sm:px-6 lg:px-8">
      <div className="flex w-11/12 max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Section: Image */}
        <div className="hidden md:block w-1/2 bg-gradient-to-tr from-blue-500 to-purple-50 relative">
          <img
            src="https://i.pinimg.com/236x/86/d1/07/86d107cbbcf8f527bc9fcc374764a36a.jpg"
            alt="forgot"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section: Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">
            Forgot Password
          </h2>
          <form onSubmit={handleForgotPassword} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Enter your email to receive a reset link
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {message && (
              <p className="text-green-500 text-sm text-center">{message}</p>
            )}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
