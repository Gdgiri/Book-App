import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { FaSpinner } from "react-icons/fa";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const navigate = useNavigate(); // Initialize navigate

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgotPassword",
        { email }
      );

      // Display a success message
      setMessage(response.data.message);
      setError("");
      setLoading(false); // Reset loading state

      // If the server returns a token for testing purposes:
      const { token } = response.data;

      if (token) {
        // Navigate to the reset password page with the token
        setTimeout(() => {
          navigate(`/reset-password/${token}`);
        }, 2000); // Adding a delay to give the user time to read the message
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setMessage("");
      setLoading(false); // Reset loading state on error
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

        <form onSubmit={handleForgotPassword} className="space-y-4">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message && <p className="text-green-500 text-sm">{message}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex justify-center items-center"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2 text-center" />{" "}
                  Loading...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
