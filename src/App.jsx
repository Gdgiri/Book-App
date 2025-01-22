// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import ForgotPasswordPage from "./Pages/ForgotPassword";
import ResetPasswordPage from "./Pages/ResetPassword";
import UploadStory from "./Pages/uploadStory";
import StoryList from "./Pages/StoryList";
import UserStories from "./Pages/UserStories";
import EditStory from "./Pages/EditStory";
import Navbar from "./Components/Navbar";
import StoryDetail from "./Pages/StoryDetail";
import RatingService from "./Pages/RatingService";
import Footer from "./Components/Footer";
import About from "./Pages/About";
import Privacy from "./Pages/Privacy";
import Contact from "./Pages/Contact";
import License from "./Pages/License";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Authentications */}

        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route
          path="/reset-password/:resetToken"
          element={<ResetPasswordPage />}
        />
        {/* Sories */}

        <Route path="/upload" element={<UploadStory />} />
        <Route path="/getall" element={<StoryList />} />
        <Route path="/get" element={<UserStories />} />
        <Route path="/update/:id" element={<EditStory />} />
        <Route path="/story" element={<StoryDetail />} />

        {/* footer */}
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/licensing" element={<License />} />

        {/* Rating and review */}

        <Route path="/rating" element={<RatingService />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
