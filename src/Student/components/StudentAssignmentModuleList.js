import React from "react";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";

function StudentAssignmentModuleList() {
    const  ModuleRef = db.collection("Courses")
        .doc("Computer Science")
        .collection("modules")
    const [Module] = useCollectionData(ModuleRef, { idField: "Title" });
    console.log(Module);

    return (
        <div>
            <h1>View Your Assignments</h1>
            {Module?.map((module) => (
                <Modules key={module.Title} ModuleTitle={module} />
            ))}
        </div>
    );
}

function Modules({ ModuleTitle }) {
    const { Title } = ModuleTitle;
    const pathTitle = "/StudentAssignmentView/" + Title;
    return (
        <div className="card-header border-white border-top text-md-center" style={{borderBlockColor:"#424242"}}>
            <a className="text-warning">
                <Button variant="secondary" style={{background:"#424242"}}>
                    <Link style={{color:"white"}} to={pathTitle}>{Title}</Link>
                </Button>
            </a>
        </div>
    );
}

export default StudentAssignmentModuleList;