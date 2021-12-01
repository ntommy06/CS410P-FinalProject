import React, {Component} from 'react'
import './MyChart.css'
import {Bar, Chart, Line, Pie, Radar} from 'react-chartjs-2'
import { BarElement } from 'chart.js/auto'
import { plugins } from '@testing-library/react/node_modules/pretty-format'


    function MyChart(){
        return <div id="barChart">
            <Radar
                datasetIdkey='id'
                data={{
                    labels: ['FGM', 'FGA', 'FG%', 'FTM', 'FTA', 'FT%', '3PTM', '3PTA', '3PT%', 'PTS', 'REB', 'AST', 'STL', 'BLK', 'TO'],
                    datasets: [
                        {
                            id: 2,
                            label: 'Player Stats',
                            data: [3, 10, 1, 4, 5, 6, 4, 8, 9, 10, 11, 2, 2, 14, 5],
                        },
                    ],
                }}
                width={800}
                height={400}
                options={{
                    maintainAspectRatio: false
                }}

            />
        </div>
    }


    export default MyChart