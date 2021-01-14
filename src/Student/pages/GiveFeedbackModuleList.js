import React, { useState, useEffect } from "react";
import StudentNavBar from "../NavBar/StudentNavBar";
import "firebase/firestore";

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
