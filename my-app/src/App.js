import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Compare from './pages/Compare';
import Performance from './pages/Performance';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
