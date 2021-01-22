import React from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import DiscussionBoard from "../../Student/components/DiscussionBoard";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default class StudentDiscussionBoard extends React.Component {
  render() {
    console.log(this.props);
    console.log(this.props.match.params);
    const input = this.props.match.params.thread;
    return (
      <div>
        <AdminNavBar />

        <div style={{paddingLeft:"20px",paddingTop:"30px"}}>

            <Link to="/AdminThreads">
                <Button variant="secondary" style={{backgroundColor:"#1A1A1B"}}>
                    Back to Threads
                </Button>

            </Link>

        </div>



        <DiscussionBoard input={input} />
      </div>
    );
  }
}
