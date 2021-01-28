import React, { Component } from "react";
import {
  Legend,
  ComposedChart,
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  ResponsiveContainer,
} from "recharts";
import CSS from "./GraphElement.css";

/**
 * Created by: Harry Clifford
 * Code to create a bar chart in recharts with a custom toggleable legend
 */

let data = [];

// Creates a Rechart bar chart with interactive legend
class BarChart extends Component {
  // Set up class properties
  constructor(props) {
    super(props);
    this.selectBar = this.selectBar.bind(this);
    data = props.data;
    this.state = {
      labels: this.props.labels,
    };
  }
  // Update legend on click to hide/show lines
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
  // Renders bar chart
  render() {
    return (
      <div>
        <ResponsiveContainer className="MarkGraph" width="90%" height={600}>
          <ComposedChart data={data} margin={{ top: 10, bottom: 30 }}>
            <CartesianGrid stroke="#626262" strokeDasharray="3 3" />
            <XAxis
              dataKey="Title"
              axisLine={{ stroke: "#626262" }}
              tick={{ dy: 7 }}
              stroke="#626262"
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
              axisLine={{ stroke: "#626262" }}
              stroke="#626262"
            >
              <Label
                value="Marks (%)"
                angle="-90"
                position="left"
                offset={-17.5}
                stroke="#F8F8FF"
              />
            </YAxis>
            <Tooltip contentStyle={{ background: "#626262" }} />
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
export default BarChart;
