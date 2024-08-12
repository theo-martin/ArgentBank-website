import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "../NavBar";
import Footer from "../Footer";
import Index from "../../pages/Index";
import SignIn from "../../pages/SignIn";
import User from "../../pages/User";
import ProtectedRoute from "../../slices/ProtectedRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<SignIn />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
