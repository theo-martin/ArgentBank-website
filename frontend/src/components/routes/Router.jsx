import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Index from "../../pages/Index";
import Userlogin from "../../pages/Userlogin";
import User from "../../pages/User";
import PropTypes from "prop-types";

const Router = () => {
  const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/User" />;
  };

  ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
  };

  const isAuthenticated = () => {
    return sessionStorage.getItem("token") != null;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Userlogin />} />
        {/* <Route path="/User" element={<User />} /> */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
