import React, { Component } from "react";
import axios from "axios";
import MyChart from "../components/MyChart/MyChart";
import "./Search.css";
import {Bar, Chart, Line, Pie, Radar} from 'react-chartjs-2';


class Search extends Component {
  constructor(props) {
      super(props);

      this.state= {
          playerName: [],
          playerAvg: [],
          // userSearch: ""
      }
  }
  
  render() {
    return (
      <div id="searchBody">
        <div className="mySearch">
          <h1>Search for an NBA player</h1>
        </div>
        <div>
          <table className="searchTable">
            <tbody id="searchBar">
              <tr>
                <td><input id = "userInputP" name="input" type="search" placeholder="Enter in player's name"/></td>
                <td><button id="btn" type="submit" onClick={this.getplayerID}>Submit</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="playerContainer">
          <table className="playerTable" cellSpacing="0">
            <thead className="searchThead">
              <tr>
                <td id="imageId" colSpan="2"><img id="img" alt="Player Not Found" width="330.7px"></img></td>
              </tr>
              <tr>
                <td><b>Name: </b></td>
                <td><span id="pName"></span></td>
              </tr>
              <tr>
                <td><b>Position: </b></td>
                <td><span id = "pPos"></span></td>
              </tr>
              <tr>
                <td><b>Team:</b></td>
                <td><span id = "pTeam"></span></td>
              </tr>
              <tr>
                <td><b>Height:</b></td>
                <td><span id = "pHeight"></span></td>
              </tr>
              <tr>
                <td><b>Weight:</b></td>
                <td><span id="pWeight"></span></td>
              </tr>
            </thead>
            <tbody id="statBody">
              <tr>
                <td id="statHead" colSpan="2">
                  <b>Stats</b>
                </td>
              </tr>
              <tr>
                <td>FGM:</td>
                <td><span id="fgm"></span></td>
              </tr>
              <tr>
                <td>FGA:</td>
                <td> <span id="fga"></span> </td>
              </tr>
              <tr>
                <td>FG%:</td>
                <td> <span id="fg_pct"></span> </td>
              </tr>
              <tr>
                <td>FTM:</td>
                <td> <span id="ftm"></span> </td>
              </tr>
              <tr>
                <td>FTA:</td>
                <td> <span id="fta"></span> </td>
              </tr>
              <tr>
                <td>FT%:</td>
                <td> <span id="ft_pct"></span> </td>
              </tr>
              <tr>
                <td>3PTM:</td>
                <td> <span id="fg3m"></span> </td>
              </tr>
              <tr>
                <td>3PTA:</td>
                <td> <span id="fg3a"></span> </td>
              </tr>
              <tr>
                <td>3PT%:</td>
                <td> <span id="fg3_pct"></span> </td>
              </tr>
              <tr>
                <td>PTS:</td>
                <td> <span id="pts"></span> </td>
              </tr>
              <tr>
                <td>REB:</td>
                <td> <span id="reb"></span> </td>
              </tr>
              <tr>
                <td>AST:</td>
                <td> <span id="ast"></span> </td>
              </tr>
              <tr>
                <td>ST:</td>
                <td> <span id="stl"></span> </td>
              </tr>
              <tr>
                <td>BLK:</td>
                <td> <span id="blk"></span> </td>
              </tr>
              <tr>
                <td>TO:</td>
                <td> <span id="turnover"></span> </td>
              </tr>
            </tbody>
              <div id='cContainer'>
                <MyChart 
                  // passing userinput to myChart JS
                  title = {this.state.userSearch}
                />
              </div>
          </table>
        </div>
      </div>
    );
  }


  getplayerID = () => {
    // gets the userInput and puts in playerObj
    let playerObj = document.getElementById("userInputP").value;

    // to pass onto the MyChartjs
    this.setState({userSearch:document.getElementById("userInputP").value})

    // compares players name from api to playerObj(userInput)
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${playerObj}`)
    .then(async res => {
      let playerFullName = res.data.data[0].first_name + " " + res.data.data[0].last_name;
      let playerTeam = res.data.data[0].team.full_name;
      let position = res.data.data[0].position;
      let height = res.data.data[0].height_feet + "'" + res.data.data[0].height_feet +'"'
      let weight = res.data.data[0].weight_pounds + " lbs";

      this.getProfileImg(1, res.data.data[0].first_name, res.data.data[0].last_name);

      document.getElementById("pName").innerHTML = playerFullName;
      document.getElementById("pPos").innerHTML = position;
      document.getElementById("pTeam").innerHTML = playerTeam; 
      document.getElementById("pHeight").innerHTML = height;
      document.getElementById("pWeight").innerHTML = weight;
      

      this.pushPlayer(playerFullName)
      this.getStats(res.data.data[0].id)
      // console.log(res.data.data[0].full_name);
    }).catch(err => {
      console.log(err)
    })
  }

  getProfileImg = (id, firstName, lastName) => {
    axios.get(`https://nba-players.herokuapp.com/players/${lastName}/${firstName}`)
    .then(async res => {
      let image = document.getElementById("img")
      image.src = res.config.url;
    })
  }

  getStats = (playerId) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`)
    .then(async res => {
      if(res.data.data === undefined){
        alert("This player is either injured or hasn't played")
      }
      this.pushStats(playerId, res.data.data)
      this.toTable();
    }).catch(err => {
      console.log(err);
    })
  }

  toTable = () => {
    let statArray = [
      'fgm',
      'fga',
      'fg_pct',
      'ftm',
      'fta',
      'ft_pct',
      'fg3m',
      'fg3a',
      'fg3_pct',
      'pts',
      'reb',
      'ast',
      'stl',
      'blk',
      'turnover'
    ]


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
      data.turnover
    ]


    for(let i = 0; i < statArray.length; ++i){
      let statName = statArray[i];
      let stat = stats[i];

      document.getElementById(statName).innerHTML = stat;
    }

  }

  pushStats = (id, Avg) => {
    this.setState({playerAvg: []});
    this.setState(state=> {
      const playerAvg = state.playerAvg.concat(Avg);
      return{
        playerAvg,
      }
    })
  }

  pushPlayer = (name) => {
    this.setState({playerFullName: []});
    this.setState(state => {
      const playerName = state.playerName.concat(name);
      return{
        playerName,
      }
    })
  }

}

export default Search;
