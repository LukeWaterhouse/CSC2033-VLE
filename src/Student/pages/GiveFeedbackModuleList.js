import React, { useState, useEffect } from "react";
import StudentNavBar from "../NavBar/StudentNavBar";
import "firebase/firestore";


/**
 * Created by: Luke Waterhouse
 * This page shows a list of modules you can pick from as links so you can give feedback to each of them
 */


import StudentModuleList from "../components/GiveFeedbackModuleListComp";

function GiveFeedbackModuleList() {
  return (
    <div>
      <StudentNavBar />
      <StudentModuleList />
    </div>
  );
}

export default GiveFeedbackModuleList;
