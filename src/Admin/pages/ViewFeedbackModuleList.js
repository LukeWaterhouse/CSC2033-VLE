import React from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import ModuleThreads from "../components/ModuleThreadsListComp";

export default function ViewFeedbackModuleList() {
  return (
    <div>
      <AdminNavBar />
      <ModuleThreads />
    </div>
  );
}
