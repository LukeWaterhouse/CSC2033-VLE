import React, { useState } from "react";
import { Link } from "react-router-dom";
import StudentNavBar from "../NavBar/StudentNavBar";
import GiveFeedbackPageComp from "../components/GiveFeedbackPageComp";
import GiveGeneralFeedback from "../components/GiveGeneralFeedback";

export default class ViewFeedbackPage extends React.Component {
  render() {
    console.log(this.props);
    console.log(this.props.match.params);
    const input = this.props.match.params.module;
    return (
      <div>
        <StudentNavBar />
        <Link to="/StudentFeedback">Back to Modules</Link>

        <FeedbackButtons input={input} />
      </div>
    );
  }
}

function FeedbackButtons(props) {
  const [GeneralButtonView, setGeneralButtonView] = useState(false);
  const [AssignmentButtonView, setAssignmentButtonView] = useState(false);

  function handleAssignmentClick() {
    setAssignmentButtonView(true);
    setGeneralButtonView(false);
  }

  function handleGeneralClick() {
    setGeneralButtonView(true);
    setAssignmentButtonView(false);
  }

  function handleClose() {
    setAssignmentButtonView(false);
    setGeneralButtonView(false);
  }

  return (
    <div>
      <button onClick={handleAssignmentClick}>Assignment Feedback</button>
      <button onClick={handleGeneralClick}>General Feedback</button>

      <dialog open={GeneralButtonView}>
        <GiveGeneralFeedback input={props.input} />
        <button onClick={handleClose} color="primary">
          Cancel
        </button>
      </dialog>

      <dialog open={AssignmentButtonView}>
        <GiveFeedbackPageComp input={props.input} />
        <button onClick={handleClose} color="primary">
          Cancel
        </button>
      </dialog>
    </div>
  );
}
