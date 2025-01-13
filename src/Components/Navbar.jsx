import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Navigate to the login page
    navigate("/login");
  };

  const handleRegister = () => {
    // Navigate to the register page
    navigate("/");
  };

  // Check if the user is logged in by checking the token in localStorage
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center text-white">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/getall")}
      >
        Book App
      </h1>
      <ul className="flex space-x-8 mx-auto">
        <li>
          <Link to="/getall" className="text-white hover:text-gray-200">
            Home
          </Link>
        </li>
        <li>
          <Link to="/get" className="text-white hover:text-gray-200">
            Stories
          </Link>
        </li>
      </ul>
      <ul className="flex space-x-4">
        {isLoggedIn ? (
          <>
            <li>
              <button
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <button
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
              onClick={handleRegister}
            >
              Register
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
