import React, { useState, useEffect } from "react";
import StudentNavBar from "../NavBar/StudentNavBar";
import "firebase/firestore";
import StudentAssignmentList from "../components/StudentAssignmentList";

class StudentAssignmentView extends React.Component {
  render() {
    console.log(this.props);
    console.log(this.props.match.params);
    const module = this.props.match.params.module;
    return (
      <div>
        <StudentNavBar />
        <h2>Assignments</h2>
        <br />
        <StudentAssignmentList module={module} />
      </div>
    );
  }
}

export default StudentAssignmentView;
