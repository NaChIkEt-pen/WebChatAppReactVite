import { Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "../Pages/HomePage";
import BroadcastPage from "../Pages/BroadcastPage";

function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/broadcast" element={<BroadcastPage />} />
    </Routes>
  );
}

export default MyRouter;
