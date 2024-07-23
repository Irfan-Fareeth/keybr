import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated imports
import Navbar from './components/navbar/navbar';
import Home from './components/navbar/home'; // Ensure the path and name are correct
import Settings from './components/navbar/settings'; // Ensure the path and name are correct

const App = () => {


  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          {/* <Route path="/" element={<App />} /> */}
        </Routes>
      </div>
     
    </Router>
  );
};

export default App;
