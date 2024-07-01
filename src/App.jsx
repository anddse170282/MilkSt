// src/App.jsx
import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import InputUserInformation from './pages/InputUserInformation';
function App() {
  return (
    <div className="App">
      <HomePage />
      <InputUserInformation/>
    </div>
  );
}

export default App;
