import React from "react";
import StudentNavBar from "../NavBar/StudentNavBar";
import StudentThreadsList from "../components/StudentThreadsList";

/**
 * Created by: Luke Waterhouse
 * This page shows a list of the Threads as links which they can click on to go to the different discussion boards.
 */

//this function simply displays the StudentThreadsList component
function StudentThreads() {
  return (
    <div>
      <StudentNavBar />
      <StudentThreadsList />
    </div>
  );
}

export default StudentThreads;
