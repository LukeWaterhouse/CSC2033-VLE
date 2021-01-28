import React, { Component } from "react";
import "./GraphElement.css";
import EasySolution from "./TestingEasySolution";

/**
 * Created by: Harry Clifford
 * Returns the data for the Student Results page
 */

// Renders the Graph to the Student Results Page
class Graph extends Component{
    render(){
        return(
            <div className="Panel">
                <EasySolution/>
            </div>
        )
    }
}

export default Graph;