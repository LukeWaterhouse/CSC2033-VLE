import React from "react";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";

export default function ViewModules() {
  const ModulesRef = db.collection("modules");
  const [modules] = useCollectionData(ModulesRef, { idField: "id" });

  return (
    <div>
      <h1>Modules</h1>
      {modules?.map((module) => (
        <Module key={module.id} ModuleTitle={module} />
      ))}
    </div>
  );
}

function Module({ ModuleTitle }) {
  const { Title } = ModuleTitle;
  const pathTitle = "/AdminFeedback/" + Title;
  return (
    <div className="card-header">
      <h5>
        <Link to={pathTitle}>{Title}</Link>
      </h5>
    </div>
  );
}
