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
    </body>
  );
};

export default Home;
