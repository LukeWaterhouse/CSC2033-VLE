import React from "react";
import StudentNavBar from "../NavBar/StudentNavBar";
import StudentModuleGroup from "../components/StudentModuleGroup"
import "../css-files/StudentModules.css"

class StudentModules extends React.Component {
  render() {
    return (
      <div>
        <StudentNavBar />
        <h2>StudentModules</h2>
        <StudentModuleGroup/>
      </div>
    );
  }
}

export default StudentModules;
