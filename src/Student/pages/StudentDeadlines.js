import React from "react";
import StudentNavBar from "../NavBar/StudentNavBar";
import data from "../../DataAnalysis/Data";

class StudentDeadlines extends React.Component {
  render() {
    return (
      <div>
        <StudentNavBar />
        <h2>Student Deadlines</h2>
          <ul className="AssignmentList">
              {data.map((item, index) => {
                  return(
                      <li key={index} className="Assignment">
                          <h5> {item.Title} </h5>
                          Deadline date goes here
                      </li>
                  )
              })}
          </ul>
      </div>
    );
  }
}

export default StudentDeadlines;
