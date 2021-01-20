import React from "react";
import { Link } from "react-router-dom";
import AdminAssignments from "./AdminAssignments";
import AdminNavBar from "../NavBar/AdminNavBar";
import AssignmentList from "../components/AssignmentList";

export default class ViewAssignments extends React.Component {
    render() {
        console.log(this.props);
        console.log(this.props.match.params);
        const input = this.props.match.params.module;
        return (
            <div>
                <AdminNavBar />
                <Link to="/AdminAssignments">Back to Assignment page</Link>

                <div className="col s12 m6 l6">
                    <AssignmentList input={input}/>
                </div>
            </div>
        );
    }
}