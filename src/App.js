import "./App.css";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Compare from "./pages/Compare";

function App() {
  return (
  <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  </>
  );
}

export default App;
