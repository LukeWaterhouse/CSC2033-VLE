import React from "react";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";


/**
 * Created by: Luke Waterhouse
 * This files functionality includes displaying the different modules as links to the different feedback pages which were
 * accessed with a url extension allowing router variables to be used
 */


//this function pulls the modules from the database and sets them to a [modules] variable. It then maps through the array
//and passes each module into the Module component
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

//takes in a module object, destructures it then creates a button link sending you to a page using the module title as a
//url extension (router variable)
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
