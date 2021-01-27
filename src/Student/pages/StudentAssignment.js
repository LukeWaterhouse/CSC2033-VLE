import React, { useState, useEffect } from "react";
import StudentNavBar from "../NavBar/StudentNavBar";
import "firebase/firestore";
import StudentAssignmentModuleList from "../components/StudentAssignmentModuleList";


class StudentAssignment extends React.Component {
  render() {
    return (
      <div>
        <StudentNavBar />
        <h2>Assignments</h2>
        <br />
        <StudentAssignmentModuleList />
      </div>
    );
  }
}

export default StudentAssignment;
