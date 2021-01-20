import React from "react";
import { Link } from "react-router-dom";
import AdminAssignments from "./AdminAssignments";
import AdminNavBar from "../NavBar/AdminNavBar";

export default class AssignmentDetails extends React.Component {
    render() {
        return (
            <div>
                <AdminNavBar />
                <Link to="/AdminAssignments">Back to Assignments</Link>
                <h1>Project Details</h1>
                <br/>
                <h1>Get Submissions</h1>
            </div>
        );
    }
}