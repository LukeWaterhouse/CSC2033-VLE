import React, {Component} from 'react';
import data from './Data';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label, ResponsiveContainer } from 'recharts';
import CSS from './GraphElement.css';

class BarChart extends Component{
    render(){
        return(
            <ResponsiveContainer className="MarkGraph" width ="90%" height={600}>
                <LineChart data={data} margin={{ top: 10, bottom: 30}}>
                    <Line type="monotone" dataKey="IndividualMark" stroke="#BB86FC" strokeWidth ="2px"/>
                    <CartesianGrid stroke="#121212"/>
                    <XAxis dataKey="Title" axisLine={{ stroke: "#121212"}} tick={{dy: 7}}
                           stroke="#F8F8FF" tickInterval="150" tickCount-="{data.length}">
                        <Label value="Assignments" position="insideBottom" offset={-20} stroke="#F8F8FF"/>
                    </XAxis>
                    <YAxis domain={[0,100]} tickInterval="10" tickCount="11"
                           axisLine={{ stroke: "#121212"}} stroke="#F8F8FF">
                        <Label value="Marks (%)" angle="-90" position="left" offset={-17.5} stroke="#F8F8FF"/>
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                </LineChart>
            </ResponsiveContainer>
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

export default BarChart