import React from "react";
import {
  FaBookOpen,
  FaEdit,
  FaTrashAlt,
  FaRegEye,
  FaUpload,
} from "react-icons/fa";
import { BiCommentDots } from "react-icons/bi";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 drop-shadow-md">
            Welcome to <span className="text-blue-600">Book App</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Share your stories, explore creative worlds, and connect with fellow
            readers.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="bg-white shadow-lg rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
            <FaUpload className="text-blue-500 text-6xl mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              Upload Stories
            </h2>
            <p className="text-gray-600 mt-4 text-center">
              Share your imagination with the world by uploading your stories
              and adding images.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow-lg rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
            <FaRegEye className="text-green-500 text-6xl mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              Read & Explore
            </h2>
            <p className="text-gray-600 mt-4 text-center">
              Browse and read captivating stories from other users across
              genres.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow-lg rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
            <FaEdit className="text-yellow-500 text-6xl mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              Edit Stories
            </h2>
            <p className="text-gray-600 mt-4 text-center">
              Update your stories to ensure they reflect your evolving
              creativity.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white shadow-lg rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
            <FaTrashAlt className="text-red-500 text-6xl mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              Delete Stories
            </h2>
            <p className="text-gray-600 mt-4 text-center">
              Maintain control over your work by removing unwanted stories
              anytime.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white shadow-lg rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
            <BiCommentDots className="text-purple-500 text-6xl mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              Review Stories
            </h2>
            <p className="text-gray-600 mt-4 text-center">
              Engage with others by reviewing and commenting on their work.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="mt-16 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Share & Inspire
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-3xl">
            With the Book App, your stories take center stage. Upload engaging
            tales, add stunning visuals, and let the community experience the
            magic of your words.
          </p>
          <img
            src="https://via.placeholder.com/600x300"
            alt="Books and Stories"
            className="rounded-2xl shadow-lg w-full md:w-2/3 lg:w-1/2 transform hover:scale-105 transition-transform"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
