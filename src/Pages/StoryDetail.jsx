import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const StoryDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { story } = location.state || {};
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleRatingSubmit = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(
        "https://book-app-backend-6b6f.onrender.com/api/rating/createrating", // Replace with your endpoint
        { storyId: story._id, rating, comment },
        config
      );

      setSuccessMessage("Review submitted successfully!");
      setRating(0);
      setComment("");
      navigate("/getall");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Back
      </button>
      <h2 className="text-3xl font-bold mb-4 text-center">{story.title}</h2>
      <p className="text-gray-700 leading-relaxed text-justify whitespace-pre-line">
        {story.content}
      </p>
      <br />
      <p className="text-gray-500 mb-2 text-right">
        Author: {story.author.username}
      </p>

      {/* Rating and Review Section */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Leave a Rating and Review</h3>
        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        <div className="flex items-center space-x-2 mt-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`${
                rating >= star ? "text-yellow-400" : "text-gray-400"
              } text-2xl`}
            >
              ★
            </button>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full mt-4 p-2 border rounded-md"
          placeholder="Write your review here..."
        />
        <button
          onClick={handleRatingSubmit}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default StoryDetail;
