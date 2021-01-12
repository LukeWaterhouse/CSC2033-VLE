import React from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import AssignmentForm from "../components/AssignmentForm";

class AdminAssignments extends React.Component {

    render() {

        return (
            <div>
                <AdminNavBar />
                <h2>Admin Assignments</h2>

                <br/>
                <AssignmentForm />

            </div>


        );
    }
}

export default AdminAssignments;