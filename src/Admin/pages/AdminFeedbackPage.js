import React from "react";
import { Link } from "react-router-dom";
import FeedbackPage from "../components/FeedbackPage";
import AdminNavBar from "../NavBar/AdminNavBar";

export default class AdminFeedbackPage extends React.Component {
  render() {
    console.log(this.props);
    console.log(this.props.match.params);
    const input = this.props.match.params.module;
    return (
      <div>
        <AdminNavBar />
        <Link to="/AdminFeedback">Back to Modules</Link>
        <FeedbackPage input={input} />
      </div>
    );
  }
}
