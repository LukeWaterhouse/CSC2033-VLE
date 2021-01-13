import React from "react";
import StudentNavBar from "../../Student/NavBar/StudentNavBar";
import CSS from "../../Student/css-files/HomePage.css";
class StudentHome extends React.Component {
  render() {
    return (
      <div>
        <StudentNavBar />
        <h2>Student Home</h2>
        <p>
          <ul>
            <li> Announcements: </li>
            <li> Recent Results: </li>
            <li> Deadlines: </li>
            <li> FAQ: </li>
          </ul>
        </p>
      </div>
    );
  }
}

export default StudentHome;
