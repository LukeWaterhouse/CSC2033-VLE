import React from "react";
import StudentNavBar from "../NavBar/StudentNavBar";
import data from "../../DataAnalysis/Data";
import DeadlineFetch from '../components/DeadlinesFetch'

class StudentDeadlines extends React.Component {
  render() {
    return (
      <div>
        <StudentNavBar />
          <h1 className="text-md-center" style={{marginTop:"40px",marginBottom:"40px"}}><u>My Deadlines</u></h1>

          <div style={{display: 'flex', justifyContent: 'center'}}>

              <DeadlineFetch/>

          </div>

      </div>
    );
  }
}

export default StudentDeadlines;
