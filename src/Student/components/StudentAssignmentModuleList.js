import React from "react";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

/**
 * Created by: Giorgos Christodoulou
 * This file contains a function in which all modules are taken from the firebase and put in an array,
 * which is then looped to display the module titles as a list of buttons.
 * When one is clicked, the user will be redirected to the modules assignment list page.
 */

function StudentAssignmentModuleList() {
  //Create a list of all modules
  const ModuleRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("modules");
  const [Module] = useCollectionData(ModuleRef, { idField: "Title" });
  console.log(Module);

  //Display the Modules as links.
  return (
    <div>
      <h1>View Your Assignments</h1>
      {Module?.map((module) => (
        <Modules key={module.Title} ModuleTitle={module} />
      ))}
    </div>
  );
}

//Creates the reference and link for the module to redirect to another page.
function Modules({ ModuleTitle }) {
  const { Title } = ModuleTitle;
  const pathTitle = "/StudentAssignmentView/" + Title;
  return (
    <div
      className="card-header border-white border-top text-md-center"
      style={{ borderBlockColor: "#424242" }}
    >
      <a className="text-warning">
        <Button variant="secondary" style={{ background: "#424242" }}>
          <Link style={{ color: "white" }} to={pathTitle}>
            {Title}
          </Link>
        </Button>
      </a>
    </div>
  );
}

export default StudentAssignmentModuleList;
