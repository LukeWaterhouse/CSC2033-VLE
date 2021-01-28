import React, { Component } from "react";
import "./GraphElement.css";
import ButtonList from "./ButtonList";
import EasySolution from "./TestingEasySolution";

/**
 * Created by: Harry Clifford
 *
 */

class Graph extends Component{
    render(){
        return(
            <div className="Panel">
                <EasySolution/>
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

export default Graph;