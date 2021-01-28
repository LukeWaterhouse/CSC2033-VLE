import React from "react";
import StudentNavBar from "../NavBar/StudentNavBar";
import "firebase/firestore";
import StudentAssignmentModuleList from "../components/StudentAssignmentModuleList";

/**
 * Created by: Giorgos Christodoulou
 * This is a page with a list of modules that when clicked will redirect
 * the user to each modules assignment list page.
 */

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
