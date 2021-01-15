import React from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import AssignmentForm from "../components/AssignmentForm";
import Assignments from "../components/Assignments";

function AdminAssignments(){

        return (
            <div>
                <AdminNavBar />
                <h2>Admin Assignments</h2>
                <br/>
                <AssignmentForm />
                <Assignments />
            </div>
        );
}

export default AdminAssignments;