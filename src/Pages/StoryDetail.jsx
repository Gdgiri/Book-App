import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation to access passed state

const StoryDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { story } = location.state || {};

  if (!story) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h2 className="text-red-500 text-center text-3xl m-3">
          Story not found.
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Back
      </button>
      <h2 className="text-3xl font-bold mb-4 text-center">{story.title}</h2>

      <p className="text-gray-700 leading-relaxed text-justify">
        {story.content}
      </p>
      <br />

      <p className="text-gray-500 mb-2 text-right">
        Author: {story.author.username}
      </p>
    </div>
  );
};

export default StoryDetail;
