import React from "react";
import StudentNavBar from "../NavBar/StudentNavBar";
import DiscussionBoard from "../components/DiscussionBoard";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";


/**
 * Created by: Luke Waterhouse
 * This page shows the student discussion board with all of the messages from the thread input from the router variable
 */


//this class component gets the router variable and passes it to the DiscussionBoard component so that different threads
//can be entered and read
export default class StudentDiscussionBoard extends React.Component {
  render() {
    const input = this.props.match.params.thread;
    return (
      <div>
        <StudentNavBar />
        <div style={{ paddingLeft: "20px", paddingTop: "30px" }}>
          <Button variant="secondary" style={{ backgroundColor: "#1A1A1B" }}>
            <Link style={{ color: "white" }} to="/StudentThreads">
              Back to Threads
            </Link>
          </Button>
        </div>

        <DiscussionBoard input={input} />
      </div>
    );
  }
}
