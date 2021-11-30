import React, { Component } from "react";
import './Performance.css';
import axios from "axios";

class Performance extends Component {

    render() {
        return (
            <>

            <div className="myPerformance">
                <h1>Performance Page</h1>
                <span id="test"></span>
                
            </div>

            </>
        )
    }

    componentDidMount() {
        this.getTeam()
    }

    getTeam = () => {
        var options = {
            method: 'GET',
            url: 'https://api-basketball.p.rapidapi.com/statistics',
            params: {season: '2019-2020', league: '12', team: '133'},
            headers: {
                'x-rapidapi-host': 'api-basketball.p.rapidapi.com',
                'x-rapidapi-key': '729fcbb274msh7ae4f3db0c48544p19efa7jsncc38c7e05bab'
            }
          };

        axios.request(options).then(function (res) {
            console.log(res);
            
        }).catch(function (err) {
            console.error(err);
        });
    }
}

export default Performance;