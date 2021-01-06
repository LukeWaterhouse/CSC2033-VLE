import React, {Component} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import data from './Data';

class Graph extends Component{
    render(){
        return(
            <LineChart width={1000} height={400} data={data}>
                <Line type="monotone" dataKey="YourMark" stroke="#8884d8"/>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
            </LineChart>
        )
    }
}

function CustomTooltip ({payload, label, active}) {
    if (active) {
        return(
            <div className={"CustomTooltip"}>
                <p className="label">{`${label} : ${payload[0].value}`}</p>
                <p className ="Results">Filler Text</p>
            </div>
        );
    }
    return null;
}

export default Graph