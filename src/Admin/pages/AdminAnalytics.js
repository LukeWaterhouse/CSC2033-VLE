import React from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import Graph from "../../DataAnalysis/AdminGraph";

/**
 * Created by: Harry Clifford
 * Displays module data for the students to an admin
 */

class AdminAnalytics extends React.Component {
  render() {
    // Note that this file needs updating before final commit when specific user pulling is added
    return (
      <div>
        <AdminNavBar />
        <h2>Admin Analytics</h2>
        <Graph />
      </div>
    );
  }
}

export default AdminAnalytics;
