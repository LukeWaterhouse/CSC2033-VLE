import React, {Component} from 'react';
import { ComposedChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Label, ResponsiveContainer, Line, Legend } from 'recharts';
import CSS from '../GraphElement.css';

/**
 * Created by: Harry Clifford
 *
 */

let data = [];
let totalStudents = 0;
let totalMarks = 0;

class CumulativeFrequency extends Component{
    constructor(props) {
        super(props);
        this.selectBar = this.selectBar.bind(this);
        data = props.data[0]
        totalStudents = props.data[1]
        totalMarks = props.data[2]
        this.state = {
            labels: this.props.labels,
        };
    }

    selectBar(event) {
        let updatedLabels = [];
        for (let i = 0; i < this.state.labels.length; i++) {
            let label = this.state.labels[i];
            if (label.key !== event.dataKey) {
                updatedLabels.push(label);
            } else {
                if (/\s/.test(label.key)) {
                    let newLabel = { key: label.key.trim(), color: label.color };
                    updatedLabels.push(newLabel);
                } else {
                    let newLabel = { key: label.key + " ", color: label.color };
                    updatedLabels.push(newLabel);
                }
            }
        }
        this.setState({
            labels: this.props.labels,
            data: this.props.data[0],
            totalStudents: this.props.data[1],
            totalMarks: this.props.data[2]
        });
    }
    CustomTooltip ({payload, label, active}) {
        if (active && payload !== null) {
            return(
                <div className="CustomTooltip">
                    <p className="InfoLabel">Mark: {label}
                        &nbsp;
                        ({Percentage(label, totalMarks)}%)</p>
                    <p className ="Results">Students Achieved: {`${payload[0].value}`}
                        &nbsp;
                        ({Percentage(payload[0].value, totalStudents )}%)</p>
                    <p>Median: {`${payload[1].value}`} </p>
                    <p>UQ: {`${payload[3].value}`}</p>
                    <p>LQ: {`${payload[2].value}`}</p>
                </div>
            );
        }
        return null;
    }
    render(){
        return(
            <ResponsiveContainer className="MarkGraph" width ="90%" height={600}>
                <ComposedChart data={data} margin={{ top: 10, bottom: 30}}>
                    <CartesianGrid stroke="#121212"/>
                    <XAxis dataKey="Mark" axisLine={{ stroke: "#121212"}} tick={{dy: 7}} stroke="#F8F8FF"
                           domain={['auto', 'auto']} type="number">
                        <Label value="Marks" position="insideBottom" offset={-20} stroke="#F8F8FF"/>
                    </XAxis>
                    <YAxis axisLine={{ stroke: "#121212"}} stroke="#F8F8FF">
                        <Label value="Student Achieved" angle="-90" position="left" offset={-17.5} stroke="#F8F8FF"/>
                    </YAxis>
                    <Area type="monotone" dataKey="StudentsAchieved" stroke="#BB86FC" fill="#121212"/>
                    <Legend onClick={this.selectBar} wrapperStyle={{paddingLeft: "4%", paddingTop: "5px"}}/>
                    {this.state.labels.map((label, index) => (
                        <Line
                            key={index}
                            dataKey={label.key}
                            fill={label.color}
                            stroke={label.color}
                            strokeWidth="2px"
                            stackId={this.state.dataKey}
                            dot={false}
                        />
                    ))}
                    <Tooltip content={<this.CustomTooltip/>}/>
                </ComposedChart>
            </ResponsiveContainer>
        )
    }
}


function Percentage(achieved, max) {
  var percentage = (achieved / max) * 100;
  percentage = +percentage.toFixed(2);
  return percentage;
}

export default CumulativeFrequency;
