import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const ResetPasswordPage = () => {
  const { resetToken } = useParams(); // Retrieve reset token from the URL
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    // Check if the token is valid when the page loads (optional)
    if (!resetToken) {
      setError("Invalid or expired reset link.");
    }
  }, [resetToken]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true); // Set loading to true when the request is being made

    try {
      // Make a POST request to reset the password
      const response = await axios.post(
        `http://localhost:5000/api/auth/resetPassword/${resetToken}`,
        { newPassword: password }
      );

      setMessage(response.data.message);
      setError(""); // Clear any previous error messages

      // Redirect to login page after successful password reset
      setTimeout(() => {
        navigate("/login"); // Redirect to login page
      }, 3000); // Redirect after 3 seconds
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setMessage(""); // Clear success message if there's an error
    } finally {
      setLoading(false); // Reset loading state after the request
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {message && <p className="text-green-500 text-sm">{message}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex justify-center items-center"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2 text-center" />{" "}
                  Loading...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
