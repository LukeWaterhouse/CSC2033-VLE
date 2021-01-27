import React from "react";
import StudentNavBar from "../NavBar/StudentNavBar";
import DiscussionBoard from "../components/DiscussionBoard";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";


/**
 * Created by: Luke Waterhouse
 * This page shows the student discussion board with all of the messages from the thread input from the router variable
 */

export default class StudentDiscussionBoard extends React.Component {
  render() {
    console.log(this.props);
    console.log(this.props.match.params);
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
