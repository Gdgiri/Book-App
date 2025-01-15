import axios from "axios";

const API_BASE_URL = "https://your-api-url.com/api/ratings";

const RatingService = {
  // Add a new rating
  addRating: async (storyId, rating, comment, token) => {
    const response = await axios.post(
      `${API_BASE_URL}/add`,
      { storyId, rating, comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  // Get all ratings for a story
  getStoryRatings: async (storyId) => {
    const response = await axios.get(`${API_BASE_URL}/story/${storyId}`);
    return response.data;
  },

  // Get all ratings by the current user
  getUserRatings: async (token) => {
    const response = await axios.get(`${API_BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default RatingService;
