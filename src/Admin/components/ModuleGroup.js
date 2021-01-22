import React from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {db} from "../../firebase";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import ModulePage from "./ModulePage"

function ModuleGroup(){
    const ModuleRef = db.collection("Courses")
        .doc("Computer Science")
        .collection("modules");

    const [Modules] = useCollectionData(ModuleRef, { idField: "id"});

    return(
        <HashRouter>
            <div className="moduleList">
                <ul>
                {Modules?.map(module => (
                    <li><NavLink to={"/" + module.id}> {module.id}</NavLink></li>
                ))}
                </ul>
                <div className="content">
                    {Modules?.map(module => (
                        <Route path={"/"+module.id} >
                            <ModulePage moduleName={module.id} />
                        </Route>
                    ))}
                </div>
            </div>
        </HashRouter>
    )
}
export default ModuleGroup;