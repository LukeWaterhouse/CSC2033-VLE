import React, { useState, useEffect } from "react";
import StudentNavBar from "../NavBar/StudentNavBar";
import "firebase/firestore";
import StudentAssignmentModuleList from "../components/StudentAssignmentModuleList";

class StudentAssignment extends React.Component {
  render() {
      //Shows all active assignment as a list of cards.
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
