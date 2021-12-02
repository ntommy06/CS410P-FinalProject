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
    };
  }

  render() {
    return (
      <div>
        {/* Catches userInput */}
        <h1 class="Search-Title">{this.props.title}</h1>
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
                  label: "Player Stats",
                  // data: [3, 10, 1, 4, 5, 6, 4, 8, 9, 10, 11, 2, 2, 14, 5],
                  data:this.playerAvg,
                  // data:[this.props.myArray],
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

  getplayerID = () => {
    // let playerObj = this.props.title; 
    let playerObj = document.getElementById("userInputP").value;
// 
    axios
      .get(`https://www.balldontlie.io/api/v1/players?search=${playerObj}`)
      .then(async (res) => {
        let playerFullName =
          res.data.data[0].first_name + " " + res.data.data[0].last_name;

        document.getElementById("pName").innerHTML = playerFullName;

        await this.pushPlayer(playerFullName);
        await this.getStats(res.data.data[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getStats = (playerId) => {
    axios
      .get(
        `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`
      )
      .then(async (res) => {
        this.pushStats(playerId, res.data.data);
        this.toTable(playerId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toTable = () => {
    let statArray = [
      "fgm",
      "fga",
      "fg_pct",
      "ftm",
      "fta",
      "ft_pct",
      "fg3m",
      "fg3a",
      "fg3_pct",
      "pts",
      "reb",
      "ast",
      "stl",
      "blk",
      "turnover",
    ];

    let data;
    data = this.state.playerAvg[0];

    let stats = [
      data.fgm,
      data.fga,
      data.fg_pct,
      data.ftm,
      data.fta,
      data.ft_pct,
      data.fg3m,
      data.fg3a,
      data.fg3_pct,
      data.pts,
      data.reb,
      data.ast,
      data.stl,
      data.blk,
      data.turnover,
    ];

    for (let i = 0; i < statArray.length; ++i) {
      let statName = statArray[i];
      let stat = stats[i];

      document.getElementById(statName).innerHTML = stat;
    }
  };

  pushStats = (id, Avg) => {
    this.setState({ playerAvg: [] });
    this.setState((state) => {
      const playerAvg = state.playerAvg.concat(Avg);
      return {
        playerAvg,
      };
    });
  };

  pushPlayer = (name) => {
    this.setState({ playerFullName: [] });
    this.setState((state) => {
      const playerName = state.playerName.concat(name);
      return {
        playerName,
      };
    });
  };
}

export default MyChart;
