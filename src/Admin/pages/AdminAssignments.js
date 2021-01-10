import React from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import { Link } from "react-router-dom";
import AssForm from "../components/AssForm";

class AdminAssignments extends React.Component {

    render() {

        return (
            <div>
                <AdminNavBar />
                <h2>Admin Assignments</h2>

                <br/>

                <Link to="/AdminAssignmentCreate">
                    <button>Create Assignment</button>
                </Link>
            </div>


        );
    }
}

export default AdminAssignments;