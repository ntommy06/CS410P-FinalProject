import React, { Component } from 'react';
import './Compare.css'
import axios from 'axios';

class Compare extends Component {

    constructor(props) {
        super(props);
        this.state= {
            playerName: null,
            playerStats: {}
        }
    }

    getPlayerId1 = () => {
        let player1 = document.getElementById("compare1").value;
        // console.log(getName);
        
        axios.get("https://www.balldontlie.io/api/v1/players?search=" + player1)
        .then(async res => {
            console.log(res.data.data)
            await this.getAvgStats(res.data.data[0].id)
        }).catch(err => {
            console.log(err)
        })
    }

    getPlayerId2 = () => {
        let player2 = document.getElementById("compare2").value;
        // console.log(getName);
        
        axios.get("https://www.balldontlie.io/api/v1/players?search=" + player2)
        .then(async res => {
            console.log(res.data.data)
            await this.getAvgStats(res.data.data[0].id)
        }).catch(err => {
            console.log(err)
        })
    }

    getAvgStats = (playerid) => {
        console.log(playerid);
    }

    // componentDidMount() {
    //     this.getPlayerId();
    // }

    render() {
        return (
            <>
            <div className='myCompare'>
                <h1 id='myCompare'>Search up two players you would like to compare</h1>
            </div>
            <input
                type="search"
                id="compare1"
                placeholder="Enter first player name"
            />
            <button type="submit" onClick={this.getPlayerId1}>Enter</button>
            
            <input
                type="search"
                id="compare2"
                placeholder="Enter first player name"
            />
            <button type="submit" onClick={this.getPlayerId2}>Enter</button>

            </>
        )
    }
}

export default Compare;