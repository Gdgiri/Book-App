import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { getAllStories } from "../Redux/Slices/storeSlice"; // Import the getAllStories action
import { FaSpinner } from "react-icons/fa"; // Import spinner for loading

const StoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stories, isLoading, error } = useSelector((state) => state.story);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {
      navigate("/login"); // Redirect to login if no token is found
      return;
    }

    dispatch(getAllStories()); // Fetch stories if token exists
  }, [dispatch, navigate]);

  const handleRead = (story) => {
    // Navigate to the story detail page with the story object
    navigate("/story", { state: { story } });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-center mb-6">All Stories</h2>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center text-3xl m-3">{error}</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-white p-4 rounded-lg shadow-lg border"
            >
              <div className="mt-4">
                <img
                  src={story.coverImage}
                  alt="Cover"
                  className="w-80 h-100  mt-2 rounded-md mx-auto"
                />
              </div>
              <h3 className="text-xl font-semibold text-center">
                {story.title}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {story.description}
              </p>
              <p className="mt-2 text-sm text-gray-500 text-center">
                By {story.author.username}
              </p>
              <div className="text-center">
                <button
                  onClick={() => handleRead(story)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md "
                >
                  Read
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryList;
