import "./App.css";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Compare from "./pages/Compare";
import Performance from "./pages/Performance";

function App() {
  return (
    <body>
      {/* <Search></Search> */}
      <Home></Home>
    </body>
  );
}

export default App;
