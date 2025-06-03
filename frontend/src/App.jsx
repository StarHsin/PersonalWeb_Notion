import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import ActivityPage from "./Components/Activity/ActivityPage";
import DynamicBackgrounds from "./Components/DynamicBackgrounds";
import ActivityPhotos from "./Components/Activity/ActivityPhotos";
import Web from "./Components/Web";

export default function App() {
  return (
    <>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/awards" element={<DynamicBackgrounds />} />
          <Route path="/Web" element={<Web />} />
          <Route path="/Activity" element={<ActivityPage />} />
          <Route path="/Activity/Photos" element={<ActivityPhotos />} />
        </Routes>
      </Router>
    </>
  );
}
