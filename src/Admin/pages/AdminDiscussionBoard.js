import React from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import DiscussionBoard from "../../Student/components/DiscussionBoard";
import { Link } from "react-router-dom";

export default class StudentDiscussionBoard extends React.Component {
  render() {
    console.log(this.props);
    console.log(this.props.match.params);
    const input = this.props.match.params.thread;
    return (
      <div>
        <AdminNavBar />
        <Link to="/AdminThreads">Back to Threads</Link>
        <DiscussionBoard input={input} />
      </div>
    );
  }
}
