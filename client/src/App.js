import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./dashboard/Dashboard";
import Analytics from "./analytics/Analytics";
import Clients from "./clients/Clients";
import Books from "./books/Books";
import SignInPage from "./sign-in/SignIn";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/books" element={<Books />} />
    </Routes>
  );
}

export default App;
