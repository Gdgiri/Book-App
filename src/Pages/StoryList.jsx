import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllStories } from "../Redux/Slices/storeSlice";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";

const StoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stories, isLoading, error } = useSelector((state) => state.story);

  const [reviews, setReviews] = useState({}); // State to store reviews for each story
  const [reviewsLoading, setReviewsLoading] = useState(false); // State for reviews loading
  const [showAllComments, setShowAllComments] = useState(false); // State for toggling comments display

  // Fetch stories when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    dispatch(getAllStories());
  }, [dispatch, navigate]);

  // Fetch reviews when stories are loaded
  useEffect(() => {
    const fetchReviews = async () => {
      if (stories.length > 0) {
        setReviewsLoading(true);
        const reviewsData = {};

        for (const story of stories) {
          try {
            const response = await axios.get(
              `https://book-app-backend-6b6f.onrender.com/api/rating/reviews/${story._id}`
            );
            reviewsData[story._id] = response.data; // Store reviews by story ID
          } catch (err) {
            console.error(
              `Error fetching reviews for story ${story._id}:`,
              err
            );
          }
        }

        setReviews(reviewsData); // Update reviews state
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, [stories]); // Run only when `stories` changes

  // Function to calculate the average rating
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };

  const handleRead = (story) => {
    navigate("/story", { state: { story } });
  };

  const handleSeeMoreComments = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-center mb-6">All Stories</h2>

      {isLoading || reviewsLoading ? (
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

              {/* Display Average Rating */}
              <div className="mt-2 text-sm text-gray-500 text-center">
                {reviews[story._id] ? (
                  <>
                    <span className="font-semibold">Average Rating:</span>
                    <span className="ml-2 text-yellow-500">
                      {calculateAverageRating(reviews[story._id]).toFixed(1)} ⭐
                    </span>
                  </>
                ) : (
                  <span className="font-semibold">No ratings yet.</span>
                )}
              </div>

              {/* Display Reviews */}
              <div className="mt-4">
                <h4 className="text-lg font-semibold">Reviews:</h4>
                {reviews[story._id] ? (
                  <>
                    {reviews[story._id]
                      .slice(0, showAllComments ? reviews[story._id].length : 2)
                      .map((review) => (
                        <div key={review._id} className="border-t mt-2 pt-2">
                          <p className="text-sm text-gray-700">
                            <strong>{review.user.username}:</strong>{" "}
                            {review.comment}
                          </p>
                          <p className="text-sm text-gray-500">
                            Rating: {review.rating} ⭐
                          </p>
                        </div>
                      ))}
                    {reviews[story._id].length > 2 && (
                      <button
                        onClick={handleSeeMoreComments}
                        className="mt-2 text-blue-500"
                      >
                        {showAllComments ? "Show Less" : "See More"}
                      </button>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-gray-500">No reviews yet.</p>
                )}
              </div>

              <div className="text-center">
                <button
                  onClick={() => handleRead(story)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
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
