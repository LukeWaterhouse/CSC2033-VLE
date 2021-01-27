import React from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import DiscussionBoard from "../../Student/components/DiscussionBoard";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";


/**
 * Created by: Luke Waterhouse
 * This is the page for admin side discussion board which imports the Discussion board from the student components directory.
 * It takes a router variable which is the thread title and passes it into the discussion board component
 */

export default class StudentDiscussionBoard extends React.Component {
  render() {
      //
    const input = this.props.match.params.thread;
    return (
      <div>
        <AdminNavBar />

        <div style={{ paddingLeft: "20px", paddingTop: "30px" }}>
          <Link to="/AdminThreads">
            <Button variant="secondary" style={{ backgroundColor: "#1A1A1B" }}>
              Back to Threads
            </Button>
          </Link>
        </div>

        <DiscussionBoard input={input} />
      </div>
    );
  }
}
