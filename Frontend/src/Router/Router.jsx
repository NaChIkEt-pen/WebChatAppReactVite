import { Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "../Pages/HomePage";

function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default MyRouter;
