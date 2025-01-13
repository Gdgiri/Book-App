import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for uploading story
export const uploadStory = createAsyncThunk(
  "story/uploadStory",
  async (storyData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log("local storage token", token);

      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "https://book-app-backend-6b6f.onrender.com/api/story/createstory",
        storyData,
        config
      );

      return response.data.story;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

// Async thunk for fetching all stories
export const getAllStories = createAsyncThunk(
  "story/getAllStories",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        "https://book-app-backend-6b6f.onrender.com/api/story/getall",
        config
      );
      return response.data.stories; // Return the list of stories
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

// Async thunk for fetching a single story by ID
export const getStoryById = createAsyncThunk(
  "story/getStoryById",
  async (storyId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `https://book-app-backend-6b6f.onrender.com/api/story/idstory/${storyId}`,
        config
      );
      return response.data.story; // Return the single story
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

export const getUserStories = createAsyncThunk(
  "story/getUserStories",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        "https://book-app-backend-6b6f.onrender.com/api/story/getStory",
        config
      );
      return response.data.stories; // Return the list of user's stories
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

export const deleteStory = createAsyncThunk(
  "story/deleteStory",
  async (storyId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `https://book-app-backend-6b6f.onrender.com/api/story/deletestory/${storyId}`
      ); // Replace with your backend delete endpoint
      return storyId; // Return the storyId so it can be used in the reducer
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateStory = createAsyncThunk(
  "story/updateStory",
  async ({ storyId, storyData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://book-app-backend-6b6f.onrender.com/api/story/updatestory/${storyId}`,
        storyData
      ); // Adjust the API endpoint
      return response.data; // Assuming the response contains the updated story
    } catch (error) {
      return rejectWithValue(error.response.data); // Return error message if any
    }
  }
);

const storySlice = createSlice({
  name: "story",
  initialState: {
    story: null,
    stories: [], // Initialize an array for storing multiple stories
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadStory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadStory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.story = action.payload;
      })
      .addCase(uploadStory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllStories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllStories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stories = action.payload;
      })
      .addCase(getAllStories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getStoryById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getStoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.story = action.payload;
      })
      .addCase(getStoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getUserStories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserStories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stories = action.payload;
      })
      .addCase(getUserStories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // delete story
      .addCase(deleteStory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove the deleted story from the list of stories
        state.stories = state.stories.filter(
          (story) => story._id !== action.payload
        );
      })
      .addCase(deleteStory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update story
      .addCase(updateStory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateStory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.story = action.payload.story; // Store the updated story in the state
      })
      .addCase(updateStory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Store the error message if the request fails
      });
  },
});

export default storySlice.reducer;
