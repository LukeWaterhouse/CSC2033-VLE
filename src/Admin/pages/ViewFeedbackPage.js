import React from "react";
import { Link } from "react-router-dom";
import ViewFeedbackPageComp from "../components/ViewFeedbackPageComp";
import AdminNavBar from "../NavBar/AdminNavBar";
import AssignmentList from "../components/AssignmentList";
import Button from "react-bootstrap/Button";

/**
 * Created by: Luke Waterhouse
 * This page shows the general feedback for a module at the top using the ViewFeedbackPageComp component and then using the
 * assignment list component shows a dropdown menu of the assignments for that particular module which you may select any of
 * and view.
 */

export default class ViewFeedbackPage extends React.Component {
  render() {
    console.log(this.props);
    console.log(this.props.match.params);
    const input = this.props.match.params.module;
    return (
      <div>
        <AdminNavBar />
        <div style={{ paddingLeft: "20px", paddingTop: "30px" }}>
          <Link to="/ViewFeedbackModuleList">
            <Button variant="secondary" style={{ backgroundColor: "#1A1A1B" }}>
              Back to Modules
            </Button>
          </Link>
        </div>

        <ViewFeedbackPageComp input={input} />
        <AssignmentList input={input} />
      </div>
    );
  }
}
