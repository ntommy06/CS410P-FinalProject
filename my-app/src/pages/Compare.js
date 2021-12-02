import React, { Component, useState } from 'react';
import './Compare.css'
import axios from 'axios';

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
            <div>
                <table className="mainTable">
                    <tbody>
                        <tr>
                        <td>
                            <h3>First Player Name</h3>
                        </td>
                        <td>
                            <h3>Second Player Name</h3>
                        </td>
                        </tr>
                        <tr>
                            <td><input id="compare1" name="input" type="search" placeholder="Enter first and last name" /> </td>
                            <td><input id="compare2" name="input" type="search" placeholder="Enter first and last name" /> </td>
                        </tr>
                        <tr>
                            <td><button id="compare_btn" type="submit" onClick={this.getPlayerId1}>Enter</button></td>
                            <td><button id="compare_btn2" type="submit" onClick={this.getPlayerId2}>Enter</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* SEARCH HOW TO CREATE A TABLE NEXT TO PUT THESE ELEMENTS INTO THE TABLE FOR COMPARISON */}

            
            <div className="compareContainer">
                <table className="myTable">
                    <thead>
                    <tr>
                        <th> <span id="p1Name"></span> </th>
                        <th>Player Name</th>
                        <th> <span id="p2Name"></span> </th>
                    </tr>
                    </thead>
                    <tbody>
                         {/* Image */}
                        <tr>
                            <td> <img id="img1" alt="Player 1" width="330.7"></img> </td>
                            <td>Headshot</td>
                            <td> <img id="img2" alt="Player 2" width="330.7"></img> </td>
                        </tr>
                        {/* Team Name */}
                        <tr>
                            <td> <span id="p1Team"></span> </td>
                            <td>Team Name & Position</td>
                            <td> <span id="p2Team"></span> </td>
                        </tr>
                        {/* Player Avg Stats */}
                        <tr>
                            <td> <span id="fgm1"></span> </td>
                            <td>FGM</td>
                            <td> <span id="fgm2"></span> </td>
                        </tr>
                        <tr>
                            <td> <span id="fga1"></span> </td>
                            <td>FGA</td>
                            <td> <span id="fga2"></span> </td>
                        </tr>
                        <tr>
                            <td> <span id="fg_pct1"></span> </td>
                            <td>FG%</td>
                            <td> <span id="fg_pct2"></span> </td>
                        </tr>
                        <tr>
                            <td> <span id="ftm1"></span> </td>
                            <td>FTM</td>
                            <td> <span id="ftm2"></span> </td>
                        </tr>
                        <tr>
                            <td> <span id="fta1"></span> </td>
                            <td>FTA</td>
                            <td> <span id="fta2"></span> </td>
                        </tr>
                        <tr>
                            <td> <span id="ft_pct1"></span> </td>
                            <td>FT%</td>
                            <td> <span id="ft_pct2"></span> </td>
                        </tr>
                        <tr>
                            <td> <span id="fg3m1"></span> </td>
                            <td>3PTM</td>
                            <td> <span id="fg3m2"></span> </td>
                        </tr>
                        <tr>
                            <td> <span id="fg3a1"></span> </td>
                            <td>3PTA</td>
                            <td> <span id="fg3a2"></span> </td>
                        </tr>
                        <tr>
                            <td> <span id="fg3_pct1"></span> </td>
                            <td>3PT%</td>
                            <td> <span id="fg3_pct2"></span> </td>
                        </tr>
                        <tr>
                            <td> <span id="pts1"></span> </td>
                            <td>PTS</td>
                            <td> <span id="pts2"></span> </td>
                        </tr>
                        <tr>
                            <td> <span id="reb1"></span> </td>
                            <td>REB</td>
                            <td> <span id="reb2"></span> </td>
                        </tr>
                        <tr>
                            <td> <span id="ast1"></span> </td>
                            <td>AST</td>
                            <td> <span id="ast2"></span> </td>
                        </tr>
                        <tr>
                            <td> <span id="stl1"></span> </td>
                            <td>ST</td>
                            <td> <span id="stl2"></span> </td>
                        </tr>
                        <tr>
                            <td> <span id="blk1"></span> </td>
                            <td>BLK</td>
                            <td> <span id="blk2"></span> </td>
                        </tr>
                        <tr>
                            <td> <span id="turnover1"></span> </td>
                            <td>TO</td>
                            <td> <span id="turnover2"></span> </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            </>
        )
    }
    
    showBtn = (e) => {
        let btn2fr = document.querySelector('#compare_btn2');
        btn2fr.style.display = 'block';
        btn2fr.style.padding = `10px`;
        btn2fr.style.margin = `5px`;
        btn2fr.style.width = '97%';
        
        e.preventDefault();
    }
    

    getPlayerId1 = () => {
        let player1 = document.getElementById("compare1").value;
        
        axios.get(`https://www.balldontlie.io/api/v1/players?search=${player1}`)
        .then(async res => {
            //console.log(res.data.data)
            let realName = res.data.data[0].first_name + " " + res.data.data[0].last_name;
            let team = res.data.data[0].team.full_name;
            let position = res.data.data[0].position;

            //call function to get image from other api
            this.getImage(1, res.data.data[0].first_name, res.data.data[0].last_name)

            document.getElementById("p1Name").innerHTML = realName;
            document.getElementById("p1Team").innerHTML = team + " - " + position;

            await this.pushPlayer(realName)
            await this.getAvgStats(1, res.data.data[0].id)

            this.showBtn(res)
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
            let position = res.data.data[0].position;

            //call function to get image from other api
            this.getImage(2, res.data.data[0].first_name, res.data.data[0].last_name)

            document.getElementById("p2Name").innerHTML = realName;
            document.getElementById("p2Team").innerHTML = team + " - " + position;

            
            await this.pushPlayer(realName)
            await this.getAvgStats(2, res.data.data[0].id)
        }).catch(err => {
            console.log(err)
        })
    }

    getImage = (id, firstName, lastname) => {
        
        //WORKS but for 2018 season
        axios.get(`https://nba-players.herokuapp.com/players/${lastname}/${firstName}`)
        .then(async res => {

            if(id === 1) {
                let image = document.getElementById("img1");
                image.src = res.config.url;
            }
            if(id === 2) {
                let image = document.getElementById("img2");
                image.src = res.config.url;
            }

        })
    }

    getAvgStats = (id, playerid) => {
        //console.log(playerid);
        axios.get(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerid}`)
        .then(async res => {
            //console.log(res.data.data)

            //GOT TO PUSH avgStats into the setState
            this.pushStats(id, res.data.data)

            
            //Display to Table
            if(id === 1) {
                this.toTable(id);
            }
            if(id === 2) {
                this.toTable(id);
            }
            this.toStyle(id)

        }).catch(err => {
            console.log(err)
        })
    }


    toStyle = (id) => {
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

        let data1 =  this.state.playerAvg[0];
        
        let data2 = this.state.playerAvg[1];
        
        let stats1 = [
            data1.fgm,
            data1.fga,
            data1.fg_pct,
            data1.ftm,
            data1.fta,
            data1.ft_pct,
            data1.fg3m,
            data1.fg3a,
            data1.fg3_pct,
            data1.pts,
            data1.reb,
            data1.ast,
            data1.stl,
            data1.blk,
            data1.turnover
        ]

        let stats2 = [
            data2.fgm,
            data2.fga,
            data2.fg_pct,
            data2.ftm,
            data2.fta,
            data2.ft_pct,
            data2.fg3m,
            data2.fg3a,
            data2.fg3_pct,
            data2.pts,
            data2.reb,
            data2.ast,
            data2.stl,
            data2.blk,
            data2.turnover
        ]


        for(let i = 0; i < statArray.length; i++) {
            let statClass = document.getElementById(statArray[i]+'1');
            let statClass2 = document.getElementById(statArray[i]+'2');
            if(stats1[i] >= stats2[i]) {
                statClass.style.color = `green`;
                statClass2.style.color = `red`;
            } else {
                statClass.style.color = `red`;
                statClass2.style.color = `green`;
            }
        }
    }


    toTable = (id) => {
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

        if(id === 1) {
            //check if there is data in playerAvg
            data = this.state.playerAvg[0];
        } else {
            data = this.state.playerAvg[1];
        }

        //if the second player gets inputted first
        // if(id === 2 && this.state.playerAvg[1] === undefined) {
        //     data = this.state.playerAvg[0]
        // } else if (id === 1 && this.state.playerAvg[1] === undefined) {
        //     data = this.state.playerAvg[1]
        // } else {
        //     if(id === 1) {
        //         //check if there is data in playerAvg
        //         data = this.state.playerAvg[0];
        //     } else {
        //         data = this.state.playerAvg[1];
        //     }
        // }
        


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
        
        //Display to Table
        if(id === 1) {
            for(let i = 0; i < statArray.length; i++) {
                let statName = statArray[i];
                let stat = stats[i]

                document.getElementById(statName+"1").innerHTML = stat;
            }
        }
        if(id === 2) {
            for(let i = 0; i < statArray.length; i++) {
                let statName = statArray[i];
                let stat = stats[i];

                document.getElementById(statName+"2").innerHTML = stat;
            }
        }


    }

    pushStats = (id, Avg) => {
        //if populated - clear array
        //console.log("PUSH STATS: ")
        //console.log(Avg)

        //console.log(this.state.playerAvg.length)
        
        if(this.state.playerAvg.length === 2) {

            //check which index it is
            this.setState({playerAvg: []});

            // console.log("AFTER FULL:")
            // console.log(this.state.playerAvg)
        }

        this.setState(state => {
            const playerAvg = state.playerAvg.concat(Avg);

            return {
                playerAvg,
            }
        })
        //console.log("state.PlayerAvg:")
        //console.log(this.state.playerAvg)
        
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