import React, { Component, useState } from 'react';
import './Compare.css'
import axios from 'axios';
import ReactTable from 'react-table';

class Compare extends Component {
    constructor(props) {
        super(props);

        this.state= {
            playerName: [],
            playerAvg: []
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

            
            <div className="container">
                <h1>Comparison</h1>
                <table className="myTable">
                    <thead>
                    <tr>
                        <th> <span id="p1Name"></span> </th>
                        <th>Name</th>
                        <th> <span id="p2Name"></span> </th>
                    </tr>
                    </thead>
                    <tbody>
                         {/* Image */}
                        <tr>
                            <td>  </td>
                            <td>Image</td>
                            <td> </td>
                        </tr>
                        {/* Team Name */}
                        <tr>
                            <td> <span id="p1Team"></span> </td>
                            <td>Team Name</td>
                            <td> <span id="p2Team"></span> </td>
                        </tr>
                        {/* Player Avg Stats */}
                        <tr>
                            <td> <span id="fgm1"></span> </td>
                            <td>FGM</td>
                            <td> <span id="fgm2"></span> </td>
                        </tr>
                        <tr>
                            <td> <span id="fga1">Avg Stats 1</span> </td>
                            <td>FGA</td>
                            <td> <span id="fga2">Avg Stats 2</span> </td>
                        </tr>
                        <tr>
                            <td> <span id="fg_p1">Avg Stats 1</span> </td>
                            <td>FG%</td>
                            <td> <span id="fg_p2">Avg Stats 2</span> </td>
                        </tr>
                        <tr>
                            <td> <span id="ftm1">Avg Stats 1</span> </td>
                            <td>FTM</td>
                            <td> <span id="ftm2">Avg Stats 2</span> </td>
                        </tr>
                        <tr>
                            <td> <span id="fta1">Avg Stats 1</span> </td>
                            <td>FTA</td>
                            <td> <span id="fta2">Avg Stats 2</span> </td>
                        </tr>
                        <tr>
                            <td> <span id="ft_p">Avg Stats 1</span> </td>
                            <td>FT%</td>
                            <td> <span id="ft_p2">Avg Stats 2</span> </td>
                        </tr>
                        <tr>
                            <td> <span id="3ptm1">Avg Stats 1</span> </td>
                            <td>3PTM</td>
                            <td> <span id="3ptm2">Avg Stats 2</span> </td>
                        </tr>
                        <tr>
                            <td> <span id="3pta1">Avg Stats 1</span> </td>
                            <td>3PTA</td>
                            <td> <span id="3pta2">Avg Stats 2</span> </td>
                        </tr>
                        <tr>
                            <td> <span id="3pt_p1">Avg Stats 1</span> </td>
                            <td>3PT%</td>
                            <td> <span id="3pt_p2">Avg Stats 2</span> </td>
                        </tr>
                        <tr>
                            <td> <span id="pts1">Avg Stats 1</span> </td>
                            <td>PTS</td>
                            <td> <span id="pts2">Avg Stats 2</span> </td>
                        </tr>
                        <tr>
                            <td> <span id="reb1">Avg Stats 1</span> </td>
                            <td>REB</td>
                            <td> <span id="reb2">Avg Stats 2</span> </td>
                        </tr>
                        <tr>
                            <td> <span id="ast">Avg Stats 1</span> </td>
                            <td>AST</td>
                            <td> <span id="ast2">Avg Stats 2</span> </td>
                        </tr>
                        <tr>
                            <td> <span id="st1">Avg Stats 1</span> </td>
                            <td>ST</td>
                            <td> <span id="st2">Avg Stats 2</span> </td>
                        </tr>
                        <tr>
                            <td> <span id="blk1">Avg Stats 1</span> </td>
                            <td>BLK</td>
                            <td> <span id="blk2">Avg Stats 2</span> </td>
                        </tr>
                        <tr>
                            <td> <span id="to1">Avg Stats 1</span> </td>
                            <td>TO</td>
                            <td> <span id="to2">Avg Stats 2</span> </td>
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
            console.log(res.data.data)
            let realName = res.data.data[0].first_name + " " + res.data.data[0].last_name;
            let team = res.data.data[0].team.full_name;
            let position = res.data.data[0].position;
            document.getElementById("p1Name").innerHTML = realName;
            document.getElementById("p1Team").innerHTML = team + " - " + position;

            await this.pushPlayer(realName)
            await this.getAvgStats(1, res.data.data[0].id)
        }).catch(err => {
            console.log(err)
        })
    }

    getPlayerId2 = () => {
        let player2 = document.getElementById("compare2").value;
        
        axios.get(`https://www.balldontlie.io/api/v1/players?search=${player2}`)
        .then(async res => {
            console.log(res.data.data)
            let realName = res.data.data[0].first_name + " " + res.data.data[0].last_name;
            let team = res.data.data[0].team.full_name;
            let position = res.data.data[0].position;
            document.getElementById("p2Name").innerHTML = realName;
            document.getElementById("p2Team").innerHTML = team + " - " + position;

            
            await this.pushPlayer(realName)
            await this.getAvgStats(2, res.data.data[0].id)
        }).catch(err => {
            console.log(err)
        })
    }


    getAvgStats = (id, playerid) => {
        console.log(playerid);
        axios.get(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerid}`)
        .then(async res => {
            //console.log(res.data.data)

            //let avgStats = res.data.data[0].ast;
            
            //GOT TO PUSH avgStats into the setState
            this.pushStats(res.data.data)
            
            //Display to Table
            
            if(id === 1) {
                let fgm = this.state.playerAvg[0].fgm
                document.getElementById("fgm1").innerHTML = fgm;
            }
            if(id === 2) {
                let fgm = this.state.playerAvg[1].fgm
                document.getElementById("fgm2").innerHTML = fgm;
            }
            

            //Styling if one greater than other
            //console.log(this.state.playerAvg[0].ast);
            //console.log(this.state.playerAvg[1].ast);

            let stat = document.getElementById("fgm1");
            let stat2 = document.getElementById("fgm2");

            //CREATE A LOOP TO GO THROUGH THE WHOLE STATS TO COMPARE

            if(this.state.playerAvg[0].fgm >= this.state.playerAvg[1].fgm) {
                stat.style.color = `green`;
                stat2.style.color = `red`;
            } else {
                stat.style.color = `red`;
                stat2.style.color = `green`;
            }
        }).catch(err => {
            console.log(err)
        })
    }

    // componentDidMount() {
    //     this.getPlayerId();
    // }

    pushStats = (Avg) => {
        //if populated - clear array
        //console.log("PUSH STATS: ")
        //console.log(Avg)

        if(this.state.playerAvg.length === 2) {
            this.setState({playerAvg: []});
        }

        this.setState(state => {
            const playerAvg = state.playerAvg.concat(Avg);

            return {
                playerAvg,
            }
        })

        console.log("state.PlayerAvg:")
        console.log(this.state.playerAvg)

    }

    pushPlayer = (name) => {
        //if populated - clear array
        //console.log(this.state.playerName.length)
        if(this.state.playerName.length === 2) {
            this.setState({playerName: []});
        }

        this.setState(state => {
            const playerName = state.playerName.concat(name);

            return {
                playerName,
                //playerAvg: [{}, {}],
            }
        })
        
        //console.log("PUSH PLAYER:" + this.state.playerName);
    }
}

export default Compare;