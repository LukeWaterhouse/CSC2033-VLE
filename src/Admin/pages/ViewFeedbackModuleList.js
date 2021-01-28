import React from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import ModuleThreads from "../components/ModuleThreadsListComp";


/**
 * Created by: Luke Waterhouse
 * This page shows you the different modules that you can go into to view the different threads of feedback for them
 */

export default function ViewFeedbackModuleList() {
  return (
    <div>
      <AdminNavBar />
      <ModuleThreads />
    </div>
  );
}
