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
      <div className="header"></div>
      <div className="navBar_class">
        <Navbar></Navbar>
        <img
          id="mjWings"
          src="./mj_wings.jpeg"
          alt="Backetball Player Image"
        ></img>
      </div>
      <div className="mainContent">
        <h2>FastStats Features</h2>
      </div>
      <div className="footer">
        <h2>Developers of FastStats</h2>
      </div>
    </body>
  );
}

export default App;
