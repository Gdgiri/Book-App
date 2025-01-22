import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { uploadStory } from "../Redux/Slices/storeSlice"; // Correct import path for your storySlice

const UploadStory = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    coverImage: "",
  });

  const { title, description, content, coverImage } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, story } = useSelector((state) => state.story);

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login if no token is found
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Authentication token not found.");
      return;
    }

    const storyData = {
      title,
      description,
      content,
      coverImage,
    };

    try {
      dispatch(uploadStory(storyData)); // Dispatch the action to upload the story
    } catch (error) {
      console.error("Error uploading story:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-blue-200">
      <div className="flex w-11/12 max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
        {/* Left Section: Image */}
        <div className="w-full md:w-1/2 p-6 flex justify-center">
          <img
            src={
              coverImage ||
              "https://i.pinimg.com/736x/a6/84/05/a68405f3e6d87b2b90fec8a09be215e7.jpg"
            }
            alt="Cover"
            className="max-w-full max-h-96 object-cover rounded-md shadow-lg"
          />
        </div>

        {/* Right Section: Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-start bg-gradient-to-br from-indigo-50 to-blue-50">
          <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">
            Upload Story
          </h2>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              ></textarea>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="content"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={content}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              ></textarea>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="coverImage"
              >
                Cover Image (URL or Base64)
              </label>
              <input
                type="text"
                id="coverImage"
                name="coverImage"
                value={coverImage}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <AiOutlineLoading className="animate-spin mx-auto text-lg" />
              ) : (
                "Upload Story"
              )}
            </button>
          </form>

          {story && (
            <div className="mt-4 p-4 border border-green-200 rounded-md bg-green-100 shadow-lg">
              <h3 className="font-semibold text-lg">
                Story Uploaded Successfully!
              </h3>
              <p>{story.title}</p>
              <p>{story.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadStory;
