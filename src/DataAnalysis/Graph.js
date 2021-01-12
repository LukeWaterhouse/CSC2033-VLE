import React, {Component} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label, ResponsiveContainer } from 'recharts';
import data from './Data';
import CSS from './GraphElement.css'

class Graph extends Component{
    render(){
        return(
            <div className="Panel">
                <ResponsiveContainer width ="95%" height={600}>
                    <LineChart data={data} className="Graph">
                        <Line type="monotone" dataKey="IndividualMark" stroke="#BB86FC" strokeWidth ="2px"/>
                        <CartesianGrid stroke="#F8F8FF" />
                        <XAxis dataKey="Title" stroke="#F8F8FF" tick={{dy: 7}} tickInterval="150" tickCount-="{data.length}"/>
                        <YAxis domain={[0,100]} tickInterval="10" tickCount="11" stroke="#F8F8FF" label="Mark">
                            <Label value="Marks" position="left" offset={10} />
                        </YAxis>
                        <Tooltip content={<CustomTooltip />} />
                    </LineChart>
                </ResponsiveContainer>
                <ul className="InfoSet">
                    <li><h3> Progress </h3></li>
                </ul>
                <ul className="InfoSet">
                    <h3> Detailed Summary </h3>

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

function CustomTooltip ({payload, label, active}) {
    if (active) {
        return(
            <div className={"CustomTooltip"}>
                <p className="InfoLabel">{`${label} : ${payload[0].value}`}</p>
                <p className ="Results">Filler Text</p>
            </div>
        );
    }
    return null;
}

export default Graph