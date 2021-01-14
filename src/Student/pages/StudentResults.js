import React from "react";
import StudentNavBar from "../NavBar/StudentNavBar";
import Graph from "../../DataAnalysis/Graph";

class StudentResults extends React.Component {
  render() {
    return (
      <div>
        <StudentNavBar />
        <h2>Student Results</h2>
        <Graph />
      </div>
    );
  }
}

export default StudentResults;
