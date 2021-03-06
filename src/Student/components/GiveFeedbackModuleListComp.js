import React from "react";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

/**
 * Created by: Luke Waterhouse
 * this file contains functionality to list all the modules as links which you can then click on to take you to an
 * extension using a router variable which is used as the module name
 */

//gets the modules from the database and passes them to a [modules] array to be mapped through passing each one to a
//Module component
export default function ViewModules() {
  const ModulesRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("modules");
  const [modules] = useCollectionData(ModulesRef, { idField: "id" });

  return (
    <div>
      <h1
        style={{ marginTop: "30px", marginBottom: "30px" }}
        className="text-md-center"
      >
        <u>Give Module Feedback</u>
      </h1>
      {modules?.map((module) => (
        <Module key={module.id} ModuleTitle={module} />
      ))}
    </div>
  );
}

//takes in a module object and displays it as a link to a url extension for router variables

function Module({ ModuleTitle }) {
  const { Title } = ModuleTitle;
  const pathTitle = "/GiveFeedbackPage/" + Title;
  return (
    <div className="card-header border-white border-top text-md-center">
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
