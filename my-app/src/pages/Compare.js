import React, { Component, useState } from 'react';
import './Compare.css'
import axios from 'axios';
import ReactTable from 'react-table';

class Compare extends Component {
    constructor(props) {
        super(props);

        this.state= {
            playerName: [],
            playerAvg: [{}, {}]
        }
    }
    
    render() {
        
        return (
            <>
            <div className='myCompare'>
                <h1>Search up two players you would like to compare</h1>
            </div>
            <div className="search">
                First Player Name
                <input
                    type="search"
                    id="compare1"
                    placeholder="Enter first and last name"
                    name="input"
                />
                <button type="submit" id="btn" onClick={this.getPlayerId1}>Enter</button>

                Second Player Name
                <br />
                <input
                    type="search"
                    id="compare2"
                    placeholder="Enter first and last name"
                    name="input"
                />
                <button type="submit" id="btn" onClick={this.getPlayerId2}>Enter</button>
            </div>
            {/* SEARCH HOW TO CREATE A TABLE NEXT TO PUT THESE ELEMENTS INTO THE TABLE FOR COMPARISON */}


            {/* <div>
                <p>Name: <span id="p1Name"></span> </p>
                <p>Team: <span id="p1Team"></span> </p>
            </div>
            <div>
                <p>Name: <span id="p2Name"></span> </p>
                <p>Team: <span id="p2Team"></span> </p>
            </div> */}
            
            <div className="container">
                <h1>Comparison</h1>
                <table className="myTable">
                    <thead>
                    <tr>
                        <th> <span id="p1Name">Player 1</span> </th>
                        <th> <span id="p2Name">Player 2</span> </th>
                    </tr>
                    </thead>
                    <tbody>
                         {/* Image */}
                        <tr>
                            <td> Img1 </td>
                            <td> Img2 </td>
                        </tr>
                        {/* Team Name */}
                        <tr>
                            <td> <span id="p1Team">Team Name</span> </td>
                            <td> <span id="p2Team">Team Name</span> </td>
                        </tr>
                        {/* Player Avg Stats */}
                        <tr>
                            <td> <span id="Avg1">Avg Stats 1</span> </td>
                            <td> <span id="Avg2">Avg Stats 2</span> </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            </>
        )
    }

    getPlayerId1 = () => {
        let player1 = document.getElementById("compare1").value;
        
        axios.get(`https://www.balldontlie.io/api/v1/players?search=${player1}`)
        .then(async res => {
            //console.log(res.data.data)
            let realName = res.data.data[0].first_name + " " + res.data.data[0].last_name;
            let team = res.data.data[0].team.full_name;
            document.getElementById("p1Name").innerHTML = realName;
            document.getElementById("p1Team").innerHTML = team;

            await this.testState(realName)
            await this.getAvgStats(1, res.data.data[0].id)
        }).catch(err => {
            console.log(err)
        })
    }

    getPlayerId2 = () => {
        let player2 = document.getElementById("compare2").value;
        
        axios.get(`https://www.balldontlie.io/api/v1/players?search=${player2}`)
        .then(async res => {
            //console.log(res.data.data)
            let realName = res.data.data[0].first_name + " " + res.data.data[0].last_name;
            let team = res.data.data[0].team.full_name;
            document.getElementById("p2Name").innerHTML = realName;
            document.getElementById("p2Team").innerHTML = team;

            
            await this.testState(realName)
            await this.getAvgStats(2, res.data.data[0].id)
        }).catch(err => {
            console.log(err)
        })
    }


    getAvgStats = (id, playerid) => {
        console.log(playerid);
        axios.get(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerid}`)
        .then(async res => {
            console.log(res.data.data)
            let avgStats = res.data.data[0].ast;
            
            //GOT TO PUSH avgStats into the setState

            this.setState({playerAvg: res.data.data[0]})
            console.log(this.state.playerAvg)

            if(id === 1) {
                document.getElementById("Avg1").innerHTML = avgStats;
            }
            if(id === 2) {
                document.getElementById("Avg2").innerHTML = avgStats;
            }

            //Styling if one greater than other

        }).catch(err => {
            console.log(err)
        })
    }

    // componentDidMount() {
    //     this.getPlayerId();
    // }

    testState = (name) => {
        //if populated - clear array
        //console.log(this.state.playerName.length)
        if(this.state.playerName.length === 2) {
            this.setState({playerName: []});
        }

        this.setState(state => {
            const playerName = state.playerName.concat(name);
            //const test = [...state.playerName, name.value];

            return {
                playerName,
                //playerAvg: [{}, {}],
            }
        })
        
        console.log(this.state.playerName);
    }
}

export default Compare;