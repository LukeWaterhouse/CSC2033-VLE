import React from "react";
import StudentNavBar from "../NavBar/StudentNavBar";
import data from "../../DataAnalysis/Data";
import DeadlineFetch from '../components/DeadlinesFetch'

class StudentDeadlines extends React.Component {
  render() {
    return (
      <div>
        <StudentNavBar />
        <h2>Student Deadlines</h2>
          <DeadlineFetch/>
      </div>
    );
  }
}

export default StudentDeadlines;
