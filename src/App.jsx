// src/App.jsx
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InputUserInformation from './pages/InputUserInformation';
import Login from './pages/Login';
import Layout from './components/Layout';
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/input" element={<InputUserInformation />} />
          <Route path="/login" element={<Login />} />
          {/* Add more routes here */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
