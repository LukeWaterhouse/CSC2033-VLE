import React from "react";
import StudentNavBar from "../NavBar/StudentNavBar";
import StudentThreadsList from "../components/StudentThreadsList";

function StudentThreads() {
  return (
    <div>
      <StudentNavBar />
      <StudentThreadsList />
    </div>
  );
}

export default StudentThreads;
