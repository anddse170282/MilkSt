import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./src/Login";
import Otp from "'/src/OTP"
function App() {
  return (
    <Router>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="src/login" element={<Login />} />
          <Route path="/src/otp" element={<Otp />} />
        </Routes>
      </Router>
  );
}

export default App;
