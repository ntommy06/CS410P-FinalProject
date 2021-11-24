import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <body>
      <div className="header">
        {/* <Navbar></Navbar> //Don't know why import doesnt work*/}
        <img id="mjWings" src="./mj_wings.jpeg" alt="Backetball Player" />
      </div>
      <div id="features" className="container">
        <h2>FastStats Features</h2>
      </div>
      <div id="devs" className="container">
        <h2>Developers of FastStats</h2>
      </div>
      <div id="footer" className="container">
        <h2>Footer</h2>
      </div>
    </body>
  );
};

export default Home;
