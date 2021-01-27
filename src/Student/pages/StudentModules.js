import React from "react";
import StudentNavBar from "../NavBar/StudentNavBar";
import ModuleGroup from "../components/ModuleGroup"
import "../css-files/Modules.css"

class StudentModules extends React.Component {
  render() {
    return (
      <div>
        <StudentNavBar />
        <h2>StudentModules</h2>
        <ModuleGroup/>
      </div>
    );
  }
}

export default StudentModules;
