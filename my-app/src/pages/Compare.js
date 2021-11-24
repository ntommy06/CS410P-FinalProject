import React, { Component, useState } from 'react';
import './Compare.css'
import axios from 'axios';

class Compare extends Component {
    constructor(props) {
        super(props);
        this.state= {
            playerName: [null, null],
            playerAvg: {}
        }
    }

    getPlayerId1 = () => {
        let player1 = document.getElementById("compare1").value;
        // console.log(getName);
        
        axios.get(`https://www.balldontlie.io/api/v1/players?search=${player1}`)
        .then(async res => {
            console.log(res.data.data)
            let realName = res.data.data[0].first_name + " " + res.data.data[0].last_name;
            let team = res.data.data[0].team.full_name;
            document.getElementById("p1Name").innerHTML = realName;
            document.getElementById("p1Team").innerHTML = team;

            await this.testD(0, realName)
            await this.getAvgStats(res.data.data[0].id)
        }).catch(err => {
            console.log(err)
        })
    }

    getPlayerId2 = () => {
        let player2 = document.getElementById("compare2").value;
        // console.log(getName);
        
        axios.get(`https://www.balldontlie.io/api/v1/players?search=${player2}`)
        .then(async res => {
            console.log(res.data.data)
            let realName = res.data.data[0].first_name + " " + res.data.data[0].last_name;
            let team = res.data.data[0].team.full_name;
            document.getElementById("p2Name").innerHTML = realName;
            document.getElementById("p2Team").innerHTML = team;

            
            await this.testD(1, realName)
            await this.getAvgStats(res.data.data[0].id)
        }).catch(err => {
            console.log(err)
        })
    }

    getAvgStats = (playerid) => {
        console.log(playerid);
        axios.get(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerid}`)
        .then(async res => {
            console.log(res.data.data)
            this.setState({playerAvg: res.data.data[0]})
        }).catch(err => {
            console.log(err)
        })
    }

    // componentDidMount() {
    //     this.getPlayerId();
    // }

    testD = (index, name) => {
        // console.log(this.state.playerName)
    }
    
    render() {
        
        return (
            <>
            <div className='myCompare'>
                <h1>Search up two players you would like to compare</h1>
            </div>
            <div className="search">
                <input
                    type="search"
                    id="compare1"
                    placeholder="Enter first and last name"
                    name="input"
                />
                <button type="submit" id="btn" onClick={this.getPlayerId1}>Enter</button>

                <input
                    type="search"
                    id="compare2"
                    placeholder="Enter first and last name"
                    name="input"
                />
                <button type="submit" id="btn" onClick={this.getPlayerId2}>Enter</button>
            </div>
            {/* SEARCH HOW TO CREATE A TABLE NEXT TO PUT THESE ELEMENTS INTO THE TABLE FOR COMPARISON */}
            <div>
                <p>Name: <span id="p1Name"></span> </p>
                <p>Team: <span id="p1Team"></span> </p>
            </div>
            <div>
                <p>Name: <span id="p2Name"></span> </p>
                <p>Team: <span id="p2Team"></span> </p>
            </div>
            </>
        )
    }
}

export default Compare;