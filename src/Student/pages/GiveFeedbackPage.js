import React, { useState } from "react";
import { Link } from "react-router-dom";
import StudentNavBar from "../NavBar/StudentNavBar";
import GiveFeedbackPageComp from "../components/GiveFeedbackPageComp";
import GiveGeneralFeedback from "../components/GiveGeneralFeedback";
import { ButtonGroup, Button } from "react-bootstrap";

/**
 * Created by: Luke Waterhouse
 * This shows options to give feedback for either general module or specific assignment feedback
 */

//this class component gets the router variable and passes it into the FeedbackButtons component.
export default class ViewFeedbackPage extends React.Component {
  render() {
    const input = this.props.match.params.module;
    return (
      <div>
        <StudentNavBar />

        <div style={{ paddingLeft: "20px", paddingTop: "30px" }}>
          <Button variant="secondary" style={{ backgroundColor: "#1A1A1B" }}>
            <Link style={{ color: "white" }} to="/StudentFeedback">
              Back to Modules
            </Link>
          </Button>
        </div>

        <FeedbackButtons input={input} />
      </div>
    );
  }
}

//this component displays two dialogue boxes, one for assignment feedback (GiveFeedbackPageComp) and one for general feedback
//(Give General Feedback)
function FeedbackButtons(props) {
  const [GeneralButtonView, setGeneralButtonView] = useState(false);
  const [AssignmentButtonView, setAssignmentButtonView] = useState(false);

  //handles the visibility of the dialogue buttons
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
      <div style={{ marginLeft: "40%", marginTop: "70px" }}>
        <ButtonGroup aria-label="Basic example">
          <Button size="lg" variant="secondary" onClick={handleAssignmentClick}>
            Assignment Feedback
          </Button>
          <Button
            size="lg"
            style={{ marginLeft: "30px" }}
            variant="secondary"
            onClick={handleGeneralClick}
          >
            General Feedback
          </Button>
        </ButtonGroup>
      </div>

      <dialog
        style={{ width: "700px", marginTop: "50px", marginLeft: "33%" }}
        open={GeneralButtonView}
      >
        <GiveGeneralFeedback input={props.input} />
        <Button
          variant="danger"
          style={{
            marginTop: "20px",
            marginBottom: "10px",
            marginLeft: "15px",
          }}
          onClick={handleClose}
          color="primary"
        >
          Cancel
        </Button>
      </dialog>

      <dialog
        style={{ width: "700px", marginTop: "50px", marginLeft: "33%" }}
        open={AssignmentButtonView}
      >
        <GiveFeedbackPageComp input={props.input} />
        <Button
          variant="danger"
          style={{
            marginTop: "20px",
            marginBottom: "10px",
            marginLeft: "15px",
          }}
          onClick={handleClose}
          color="primary"
        >
          Cancel
        </Button>
      </dialog>
    </div>
  );
}
