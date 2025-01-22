import React from "react";
import { NavLink } from "react-router-dom";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-blue-600 py-14 mt-15">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 md:px-16">
        {/* Left Side - Copyright */}
        <div className="text-sm text-white md:text-left mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Book-App. All rights reserved.
        </div>

        {/* Center - Footer Links */}
        <div className="my-4 md:my-0 flex justify-center md:flex-grow">
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 font-bold border-b-2 border-yellow-400"
                    : "text-white hover:border-b-2 border-yellow-400"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/privacy"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 font-bold border-b-2 border-yellow-400"
                    : "text-white hover:border-b-2 border-yellow-400"
                }
              >
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/licensing"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 font-bold border-b-2 border-yellow-400"
                    : "text-white hover:border-b-2 border-yellow-400"
                }
              >
                Licensing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 font-bold border-b-2 border-yellow-400"
                    : "text-white hover:border-b-2 border-yellow-400"
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Side - Social Media Icons */}
        <div className="flex flex-wrap justify-center space-x-8 mt-6 md:mt-0">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=giridharan831@gmail.com"
            aria-label="Gmail"
            className="bg-white rounded-full p-3 text-red-600 hover:bg-red-100 hover:text-red-600 transition-transform transform hover:scale-125"
          >
            <SiGmail className="w-8 h-8" />
          </a>
          <a
            href="https://github.com/Gdgiri"
            aria-label="GitHub"
            className="bg-white rounded-full p-3 text-gray-900 hover:bg-gray-100 hover:text-gray-900 transition-transform transform hover:scale-125"
          >
            <FaGithub className="w-8 h-8" />
          </a>
          <a
            href="https://www.linkedin.com/in/giridharan-sivaramakrishnan-91353b333"
            aria-label="LinkedIn"
            className="bg-white rounded-full p-3 text-blue-500 hover:bg-blue-100 hover:text-blue-700 transition-transform transform hover:scale-125"
          >
            <FaLinkedinIn className="w-8 h-8" />
          </a>
          <a
            href="https://wa.me/9715424895"
            aria-label="WhatsApp"
            className="bg-white rounded-full p-3 text-green-600 hover:bg-green-100 hover:text-green-600 transition-transform transform hover:scale-125"
          >
            <FaWhatsapp className="w-8 h-8" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
