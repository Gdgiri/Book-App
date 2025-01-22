import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams to access the route params
import { AiOutlineLoading } from "react-icons/ai";
import axios from "axios"; // Import axios for making API calls

const EditStory = () => {
  const { id } = useParams(); // Get the story ID from the URL
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    coverImage: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [story, setStory] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  // Fetch the existing story when the component mounts
  useEffect(() => {
    if (!id) {
      setError("Invalid story ID.");
      return;
    }

    const token = localStorage.getItem("token"); // Assuming your token is stored in localStorage

    if (!token) {
      setError("You must be logged in to view the story.");
      navigate("/login");
      return;
    }

    const fetchStory = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://book-app-backend-6b6f.onrender.com/api/story/idstory/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStory(response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          content: response.data.content,
          coverImage: response.data.coverImage,
        });
      } catch (err) {
        setError("Failed to fetch story.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to update the story.");
      navigate("/login");
      setIsLoading(false);
      return;
    }

    try {
      await axios.put(
        `https://book-app-backend-6b6f.onrender.com/api/story/updatestory/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Story updated successfully!"); // Set success message
      setTimeout(() => {
        setSuccessMessage(""); // Clear success message after 3 seconds
      }, 3000);
      navigate(`/get`);
    } catch (err) {
      setError("Failed to update story.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to delete the story.");
      navigate("/login");
      setIsLoading(false);
      return;
    }

    try {
      await axios.delete(
        `https://book-app-backend-6b6f.onrender.com/api/story/deletestory/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Story deleted successfully!"); // Set success message
      setTimeout(() => {
        setSuccessMessage(""); // Clear success message after 3 seconds
      }, 3000);
      navigate("/get");
    } catch (err) {
      setError("Failed to delete story.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto border rounded-md shadow-lg flex items-center m-10">
      <div className="flex-1 pr-6">
        <img
          src="https://i.pinimg.com/736x/96/07/59/960759a9a5290e870005e5da870a12b6.jpg"
          alt="edit"
          className="w-full h-auto rounded-md"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Edit Story</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        {/* Display the success message */}
        {successMessage && (
          <p className="text-green-500 mb-2">{successMessage}</p>
        )}

        {isLoading && <p>Loading...</p>}

        {story && !isLoading && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Story Preview</h3>
            <div className="mb-2">
              <strong>Title:</strong> {story.title}
            </div>
            <div className="mb-2">
              <strong>Description:</strong> {story.description}
            </div>
            <div className="mb-2">
              <strong>Content:</strong> {story.content}
            </div>
            <div className="mb-2">
              <strong>Cover Image:</strong>{" "}
              <img
                src={story.coverImage}
                alt="Cover"
                className="w-full h-auto"
              />
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>

          <div className="mb-4">
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
              value={formData.coverImage}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading className="animate-spin mx-auto text-lg" />
            ) : (
              "Update Story"
            )}
          </button>
        </form>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading className="animate-spin mx-auto text-lg" />
            ) : (
              "Delete Story"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStory;
