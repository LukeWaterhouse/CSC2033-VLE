import React, { Component } from "react";
import CSS from "./GraphElement.css";
import ButtonList from "./ButtonList";
import GraphDisplaying from "./GraphDisplaying";
import Data from "./Data";

let data = new Data()
class Graph extends Component{
    render(){
        return(
            <div className="Panel">
                <ButtonList/>
                {GraphDisplaying}
                <ul className="InfoSet">
                    <h3>Progress Report</h3>
                    <li>I must write this out for text size</li>
                </ul>
                <ul className="InfoSet">
                    <h3> Detailed Summary </h3>
                    <li>I must write this out for text size</li>
                </ul>
            </div>
        )
    }
}
// <ul className="AssignmentList">
//                     {data.map((item, index) => {
//                         return(
//                             <li key={index} className="Assignment">
//                                 <h5> {item.Title} </h5>
//                                 <p>
//                                     Mark: {item.Mark} Median: {item.Median} Mean: {item.Mean}
//                                 </p>
//                             </li>
//                         )
//                     })}
//                 </ul>

export default Graph