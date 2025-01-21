import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/getall")}
        >
          Book App
        </h1>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 mx-auto">
          <li>
            <Link to="/getall" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/get" className="hover:text-gray-200">
              Stories
            </Link>
          </li>
          <li>
            <Link to="/upload" className="hover:text-gray-200">
              Upload
            </Link>
          </li>
        </ul>

        {/* Desktop Buttons */}
        <ul className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <li>
              <button
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
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
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4 ">
          <ul className="space-y-2 text-center">
            <li>
              <Link to="/getall" className="block hover:text-gray-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/get" className="block hover:text-gray-200">
                Stories
              </Link>
            </li>
            <li>
              <Link to="/upload" className="block hover:text-gray-200">
                Upload
              </Link>
            </li>
          </ul>
          <ul className="space-y-2">
            {isLoggedIn ? (
              <li>
                <button
                  className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <button
                  className="w-full bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
