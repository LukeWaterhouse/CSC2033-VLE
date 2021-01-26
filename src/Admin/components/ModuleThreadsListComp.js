import React from "react";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function ViewModules() {
  const ModulesRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("modules");
  const [modules] = useCollectionData(ModulesRef, { idField: "id" });

  return (
    <div>
      <h1
        className="text-md-center"
        style={{ marginBottom: "30px", marginTop: "30px" }}
      >
        View Module Feedback
      </h1>
      {modules?.map((module) => (
        <Module key={module.id} ModuleTitle={module} />
      ))}
    </div>
  );
}

function Module({ ModuleTitle }) {
  const { Title } = ModuleTitle;
  const pathTitle = "/ViewFeedbackPage/" + Title;
  return (
    <div
      className="card-header border-white border-top text-md-center"
      style={{ borderBlockColor: "#424242" }}
    >
      <h5>
        <Button variant="secondary" style={{ background: "#424242" }}>
          <Link style={{ color: "white" }} to={pathTitle}>
            {Title}
          </Link>
        </Button>
      </h5>
    </div>
  );
}
