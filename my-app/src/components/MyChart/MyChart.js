import React, { Component, useState, useEffect } from "react";
import "./MyChart.css";
import axios from "axios";
import { Bar, Chart, Line, Pie, Radar } from "react-chartjs-2";
import { BarElement } from "chart.js/auto";
import { plugins } from "@testing-library/react/node_modules/pretty-format";

class MyChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: [],
      playerAvg: [],
      // aPlayerName: "",
    };
  }

  render() {
    return (
      <div>
        {/* Catches userInput */}
        {/* <h1 class="Search-Title"> {this.props.title} </h1> */}
        {/* <h2>{this.props.num}</h2> */}
        <div id="barChart">
          <Radar
            datasetIdkey="id"
            data={{
              labels: [
                "FGM",
                "FGA",
                "FG%",
                "FTM",
                "FTA",
                "FT%",
                "3PTM",
                "3PTA",
                "3PT%",
                "PTS",
                "REB",
                "AST",
                "STL",
                "BLK",
                "TO",
              ],
              datasets: [
                {
                  id: 2,
                  label: this.props.title,
                  data: this.props.num
                },
              ],
            }}
            width={800}
            height={400}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    );
  }
}

export default MyChart;
