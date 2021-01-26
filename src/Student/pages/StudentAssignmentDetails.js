import React from "react";
import AdminNavBar from "../../Admin/NavBar/AdminNavBar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import StudentAssignmentDetailsComp from "../components/StudentAssignmentDetailsComp";

export default class StudentAssignmentDetails extends React.Component {
  render() {
    console.log(this.props);
    console.log(this.props.match.params);
    const input = this.props.match.params.details;
    const module = this.props.match.params.module;
    return (
      <div>
        <AdminNavBar />
        <div style={{ paddingLeft: "20px", paddingTop: "30px" }}>
          <Link to="/StudentAssignment">
            <Button variant="secondary" style={{ backgroundColor: "#1A1A1B" }}>
              Back to Assignments
            </Button>
          </Link>
        </div>
        <h1>Assignment Details</h1>
        <StudentAssignmentDetailsComp input={input} module={module} />
        <br />
        <h1>Submit</h1>
      </div>
    );
  }
}
