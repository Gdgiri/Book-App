import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { uploadStory } from "../Redux/Slices/storeSlice"; // Correct path to your Redux slice

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
    const token = localStorage.getItem("token");
    if (!token) {
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

  const handleContentChange = (e) => {
    setFormData({
      ...formData,
      content: e.currentTarget.innerHTML, // Get formatted content
    });
  };

  const applyStyle = (command, value = null) => {
    document.execCommand(command, false, value);
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
      dispatch(uploadStory(storyData));
    } catch (error) {
      console.error("Error uploading story:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto border rounded-md shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Upload Story</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

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
            value={title}
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
            value={description}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>

        {/* Text Formatting Toolbar */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <div className="toolbar flex gap-2 mb-2">
            <button type="button" onClick={() => applyStyle("bold")}>
              Bold
            </button>
            <button type="button" onClick={() => applyStyle("italic")}>
              Italic
            </button>
            <button type="button" onClick={() => applyStyle("underline")}>
              Underline
            </button>
            <button type="button" onClick={() => applyStyle("justifyLeft")}>
              Left
            </button>
            <button type="button" onClick={() => applyStyle("justifyCenter")}>
              Center
            </button>
            <button type="button" onClick={() => applyStyle("justifyRight")}>
              Right
            </button>
            <button type="button" onClick={() => applyStyle("justifyFull")}>
              Justify
            </button>
            <select
              onChange={(e) => applyStyle("fontSize", e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Font Size
              </option>
              <option value="1">Small</option>
              <option value="3">Normal</option>
              <option value="5">Large</option>
              <option value="7">Extra Large</option>
            </select>
          </div>
          <div
            contentEditable
            className="border p-2"
            onInput={handleContentChange}
            dangerouslySetInnerHTML={{ __html: content }}
            style={{
              minHeight: "100px",
              outline: "none",
            }}
          ></div>
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
            value={coverImage}
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
            "Upload Story"
          )}
        </button>
      </form>

      {story && (
        <div className="mt-4 p-4 border border-green-200 rounded-md bg-green-100">
          <h3 className="font-semibold text-lg">
            Story Uploaded Successfully!
          </h3>
          <p>{story.title}</p>
          <p>{story.description}</p>
        </div>
      )}
    </div>
  );
};

export default UploadStory;
