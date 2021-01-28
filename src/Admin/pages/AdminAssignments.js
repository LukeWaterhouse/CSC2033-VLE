import React from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import AssignmentForm from "../components/AssignmentForm";
import Assignments from "../components/Assignments";

/**
 * Created by: Giorgos Christodoulou
 * Displays a button that allows admin to create an assignment.
 * Displays a list of all modules.
 */

function AdminAssignments() {
  return (
    //Assignment creation form and module list are called.
    <div>
      <AdminNavBar />
      <h2>Admin Assignments</h2>
      <br />
      <AssignmentForm />
      <br />
      <Assignments />
    </div>
  );
}

export default AdminAssignments;
