import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Compare from './pages/Compare';
import Performance from './pages/Performance';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path='/home' element={<Home/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
