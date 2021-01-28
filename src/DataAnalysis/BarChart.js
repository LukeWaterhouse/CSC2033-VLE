import React, {Component} from 'react';
import {Legend, ComposedChart, Bar, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label, ResponsiveContainer } from 'recharts';
import CSS from './GraphElement.css'

/**
 * Created by: Harry Clifford
 *
 */

let data = []
class BarChart extends Component {
  constructor(props) {
    super(props);
    this.selectBar = this.selectBar.bind(this);
    data = props.data
    console.log(props.data, data, props)
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
      labels: updatedLabels,
    });
  }
  updateData(newData){
    data = newData
  }
  render() {
    console.log(data)
    return (
      <div>
        <ResponsiveContainer className="MarkGraph" width="90%" height={600}>
          <ComposedChart data={data} margin={{ top: 10, bottom: 30 }}>
            <Bar dataKey="Mark" fill="#BB86FC" />
            <CartesianGrid
              stroke="#626262"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="Title"
              axisLine={{ stroke: "#121212" }}
              tick={{ dy: 7 }}
              stroke="#F8F8FF"
              tickInterval="150"
              tickCount-="{data.length}"
            >
              <Label
                value="Assignments"
                position="insideBottom"
                offset={-40}
                stroke="#F8F8FF"
              />
            </XAxis>
            <YAxis
              domain={[0, 100]}
              tickInterval="10"
              tickCount="11"
              axisLine={{ stroke: "#121212" }}
              stroke="#F8F8FF"
            >
              <Label
                value="Marks (%)"
                angle= "-90"
                position="left"
                offset={-17.5}
                stroke="#F8F8FF"
              />
            </YAxis>
            <Tooltip />
            <Legend
              onClick={this.selectBar}
              wrapperStyle={{ paddingLeft: "4%", paddingTop: "5px" }}
            />
            {this.state.labels.map((label, index) => (
              <Line
                key={index}
                dataKey={label.key}
                fill={label.color}
                stroke={label.color}
                strokeWidth="2px"
                stackId={this.state.dataKey}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
export default BarChart