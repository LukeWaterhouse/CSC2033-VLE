import React, { Component } from "react";
import CSS from "./GraphElement.css";
import data from "./Data";
import cumulativeData from "./TemporaryData";
import CumulativeFrequencyGraph from "./CumulativeFrequency";
import Format from "./CumulativeDataFormatting";

var newData = Format(cumulativeData);

let labels = [
    { key: "Median", color: "#3700B3"},
    { key: "Mean", color: "#03DAC6"},
    { key: "UQ", color: "#FFC61A"},
    { key: "LQ", color: "#00E600"}
];

let cumulativeLabels = [
    { key: "Median", color: "#3700B3"},
    { key: "UQ", color: "#FFC61A"},
    { key: "LQ", color: "#00E600"}
];

class Graph extends Component{
    render(){
        return(
            <div className="Panel">
                <ul className="GraphEditor">
                    <li> <button onClick="Overall()"> Overall </button> </li>
                    <li> <button onClick="Module()"> Test Module </button></li>
                </ul>

                <CumulativeFrequencyGraph
                    title="Filler Data"
                    data={newData}
                    labels={cumulativeLabels}/>
                <ul className="InfoSet">
                    <h3>Progress Report</h3>
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
                                    Mark: {item.Mark} Median: {item.Median} Mean: {item.Mean}
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