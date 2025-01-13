import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { FaSpinner } from "react-icons/fa";
//import { AiOutlineLoading } from "react-icons/ai"; // Import react-icons for spinner
import { getUserStories } from "../Redux/Slices/storeSlice"; // Import the delete action

const UserStories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access state from the Redux store
  const { stories, isLoading, error } = useSelector((state) => state.story);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Check for the token
    //console.log(token);

    if (!token) {
      navigate("/login"); // Redirect to login if no token is found
      return;
    }

    // Dispatch the action to fetch user stories if token exists
    dispatch(getUserStories());
  }, [dispatch, navigate]);

  const handleEdit = (storyId) => {
    // Navigate to the edit page with the story ID
    navigate(`/update/${storyId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center text-3xl m-3">
        <h3 className="text-center p-2">{error}</h3>
      </div>
    );
  }

  return (
    <div className="container mx-auto justify-between">
      <h2 className="text-2xl font-bold my-4 text-center">
        Your Uploaded Stories
      </h2>
      <div className="text-center">
        <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white justify-center">
          <Link to="/upload" className="text-white">
            Upload
          </Link>
        </button>
      </div>

      {stories.length === 0 ? (
        <>
          <p>No stories uploaded yet.</p>
          <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white justify-center">
            <Link to="/upload" className="text-white">
              Upload
            </Link>
          </button>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-xl text-center">
                {story.title}
              </h3>

              {/* Display the cover image */}
              {story.coverImage && (
                <img
                  src={story.coverImage}
                  alt="Story Cover"
                  className="w-80 h-100  mt-2 rounded-md mx-auto  "
                />
              )}

              <p className="mt-2 text-justify p-3">
                <strong>Story Description:</strong> {story.description}
              </p>
              <span className="text-black-500 text-center block ">
                {new Date(story.createdAt).toLocaleDateString()}
              </span>

              <div className="mt-4 flex justify-center ">
                <button
                  onClick={() => handleEdit(story._id)}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserStories;
