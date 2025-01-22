import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // Import icons from react-icons
import { SiGmail } from "react-icons/si";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        Contact Us
      </h1>

      {/* Contact Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300 ease-in-out">
        <p className="text-xl text-center text-gray-700 mb-6">
          We would love to hear from you! Feel free to reach out to us via email
          or WhatsApp.
        </p>

        <div className="flex justify-center space-x-6">
          {/* Gmail Icon */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=giridharan831@gmail.com"
            className="text-5xl text-red-500 transform transition-transform hover:scale-110 duration-300 ease-in-out"
            title="Email"
          >
            <SiGmail />
          </a>

          {/* WhatsApp Icon */}
          <a
            href="https://wa.me/9715424895"
            className="text-5xl text-green-500 transform transition-transform hover:scale-110 duration-300 ease-in-out"
            title="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>

      {/* Footer or additional content */}
      <p className="text-gray-600 mt-8 text-center">
        If you have any questions or need support, feel free to reach out to us.
        We are here to assist you!
      </p>
    </div>
  );
};

export default Contact;
