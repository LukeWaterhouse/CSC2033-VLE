import React from "react";
import { Link } from "react-router-dom";
import ViewFeedbackPageComp from "../components/ViewFeedbackPageComp";
import AdminNavBar from "../NavBar/AdminNavBar";
import AssignmentList from "../components/AssignmentList";

export default class ViewFeedbackPage extends React.Component {
  render() {
    console.log(this.props);
    console.log(this.props.match.params);
    const input = this.props.match.params.module;
    return (
      <div>
        <AdminNavBar />
        <Link to="/ViewFeedbackModuleList">Back to Modules</Link>
        <ViewFeedbackPageComp input={input} />
        <AssignmentList input={input} />
      </div>
    );
  }
}
