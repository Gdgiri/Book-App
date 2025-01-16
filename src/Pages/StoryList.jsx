import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllStories } from "../Redux/Slices/storeSlice";
import { FaSpinner } from "react-icons/fa";
import axios from "axios"; // Import axios for fetching reviews

const StoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stories, isLoading, error } = useSelector((state) => state.story);

  const [reviews, setReviews] = useState({}); // State to store reviews for each story

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    dispatch(getAllStories()); // Fetch all stories

    // Fetch reviews for each story
    const fetchReviews = async () => {
      const reviewsData = {};
      for (const story of stories) {
        try {
          const response = await axios.get(
            `https://book-app-backend-6b6f.onrender.com/api/rating/reviews/${story._id}`
          );
          reviewsData[story._id] = response.data; // Store reviews by story ID
        } catch (err) {
          console.error("Error fetching reviews:", err);
        }
      }
      setReviews(reviewsData); // Update state with all reviews
    };

    if (stories.length > 0) {
      fetchReviews();
    }
  }, [dispatch, navigate, stories]);

  const handleRead = (story) => {
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
                  className="w-80 h-100 mt-2 rounded-md mx-auto"
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

              {/* Display Reviews */}
              <div className="mt-4">
                <h4 className="text-lg font-semibold">Reviews:</h4>
                {reviews[story._id] ? (
                  reviews[story._id].map((review) => (
                    <div key={review._id} className="border-t mt-2 pt-2">
                      <p className="text-sm text-gray-700">
                        <strong>{review.user.username}:</strong>{" "}
                        {review.comment}
                      </p>
                      <p className="text-sm text-gray-500">
                        Rating: {review.rating} ⭐
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No reviews yet.</p>
                )}
              </div>

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
