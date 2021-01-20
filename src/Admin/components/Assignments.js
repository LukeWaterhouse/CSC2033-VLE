import React from "react";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";

function Assignments() {
    const  ModuleRef = db.collection("Courses")
        .doc("Computer Science")
        .collection("modules")
    const [Module] = useCollectionData(ModuleRef, { idField: "Title" });
    console.log(Module);

    return (
        <div>
            <h1>View Assignments</h1>
            {Module?.map((module) => (
                <Modules key={module.Title} ModuleTitle={module} />
            ))}
        </div>
    );
}

function Modules({ ModuleTitle }) {
    const { Title } = ModuleTitle;
    const pathTitle = "/ViewAssignments/" + Title;
    return (
        <div className="card-header border-white">
            <a className="text-warning">
                <h5>
                    <Link to={pathTitle}>{Title}</Link>
                </h5>
            </a>
        </div>
    );
}

export default Assignments;