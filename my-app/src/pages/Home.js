import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <body>
      <div className="header">
        <img
          id="headerPicture"
          src="./Fast_Stats_Bball.jpeg"
          alt="Backetball Head"
        />
        <h2 id="headFeature">
          <ul>
            Features
            <li>
              Display average current season stats & daily stats of individual
              players
            </li>
            <li>A stat comparison between two players based on user search</li>
            <li>A page that displays the 15 top performers of the day</li>
          </ul>
        </h2>
      </div>
      {/* <div id="features" className="container">
        <h2>FastStats Features</h2>
      </div> */}
      <div id="devs" className="container">
        <h2>Developers of FastStats</h2>
        <div>Tommy Nguyen</div>
        <div>Cesar Ochoa-Navarro</div>
      </div>
      <footer id="footer" className="smallContainer">
        <a className="footerLink" href="http://localhost:3000">
          Website
        </a>
        <a
          className="footerLink "
          href="https://github.com/ntommy06/CS410P-FinalProject"
        >
          Github
        </a>
        <p id="copright"></p>
        <p id="copyright">
          © 2021 Cesar Ochoa-Navarro & Tommy Nguyen PSU_CS410P Final.
        </p>
      </footer>
    </body>
  );
};

export default Home;
