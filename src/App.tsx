import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import ProductInfo from './pages/ProductInfo';
function App() {
  return (
    <Router>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="pages/login" element={<Login />} />
          <Route path="pages/productInfo" element={<ProductInfo />} />
        </Routes>
      </Router>
  );
}

export default App;
