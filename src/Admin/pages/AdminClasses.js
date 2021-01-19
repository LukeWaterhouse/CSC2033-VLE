import React from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import {useState} from "react";
import "../css-files/AdminClasses.css"
import {db} from "../../firebase";
import {useCollectionData} from "react-firebase-hooks/firestore";




function ModuleGroup() {

    const ModuleRef = db.collection("Courses")
        .doc("Computer Science")
        .collection("modules");

    const [Modules] = useCollectionData(ModuleRef, { idField: "id"});

    const [active, setActive] = useState(Modules?[0]:null);
    return (
        <>
            <div className="module">
                {Modules?.map((module) => (
                <button
                        key={module.id}
                        active={active === module}
                        onClick={() => setActive(module)}
                        className= {active === module ? "moduleTabC" : "moduleTab"}
                    >
                        {module.id}
                    </button>
                ))}

            </div>
            <div className="moduleContent">
                <div className="moduleContentWrapperT">
                    <div className="moduleContent_leader">Module Leader :</div>
                </div>
                <div className="moduleContentWrapperS">
                    <div className="moduleContent_studentLabel">Students</div>
                    <div className="moduleContent_studentWrapper">{Modules?.map(module => ((module === active) ? (
                        <ul className="moduleContent_students">{AssignmentDisplay(Modules[module.id], ModuleRef).map(ass =>(
                            <li className="moduleContent_student">{ass.Title}</li>
                        ))}</ul>
                    ):null))}</div>
                </div>
                <div className="moduleContent_assignments"></div>
            </div>
        </>
    );
}

function AssignmentDisplay(active , ModuleRef){
    const [assignmentList] = useCollectionData(ModuleRef.doc(active).collection("Assingnments"), { idField: "Title"});
    return assignmentList;
}

class AdminClasses extends React.Component {

    render() {
        return (
            <div>
                <AdminNavBar />
                <h2>Admin Classes</h2>
                <ModuleGroup/>
            </div>
        );
    }
}

export default AdminClasses;
