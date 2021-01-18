import React, { Component } from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Label,
    ResponsiveContainer,
} from "recharts";
import data from "./Data";
import CSS from "./GraphElement.css";

class Graph extends Component{
    render(){
        return(
            <div className="Panel">
                <BarChart/>
                <ul className="InfoSet">
                    <h3>Progress</h3>
                    <li>I must write this out for text size</li>
                </ul>
                <ul className="InfoSet">
                    <h3> Detailed Summary </h3>
                    <li>I must write this out for text size</li>
                </ul>
                <ul className="AssignmentList">
                    {data.map((item, index) => {
                        return(
                            <li key={index} className="Assignment">
                                <h5> {item.Title} </h5>
                                <p>
                                    Score: {item.IndividualMark} Median: {item.Median} Mean: {item.Mean}
                                </p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default Graph