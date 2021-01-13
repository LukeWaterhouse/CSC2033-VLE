import React from "react";
import { Link } from "react-router-dom";
import StudentNavBar from "../NavBar/StudentNavBar";
import GiveFeedbackPageComp from "../components/GiveFeedbackPageComp";
export default class ViewFeedbackPage extends React.Component {
  render() {
    console.log(this.props);
    console.log(this.props.match.params);
    const input = this.props.match.params.module;
    return (
      <div>
        <StudentNavBar />
        <Link to="/StudentFeedback">Back to Modules</Link>
        <GiveFeedbackPageComp input={input} />
      </div>
    );
  }
}
