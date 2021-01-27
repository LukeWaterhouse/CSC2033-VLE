import React from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {db} from "../../firebase";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import ModulePage from "./ModulePage"
import CreateModule from "./createModule"



function ModuleGroup(){
    const ModuleRef = db.collection("Courses")
        .doc("Computer Science")
        .collection("modules");

    const [Modules] = useCollectionData(ModuleRef, { idField: "id"});

    return(
        <HashRouter>
            <div className="moduleGroup">
                <ul className="moduleGroup_links">
                {Modules?.map(module => (
                    <li className="moduleGroup_link"><NavLink className="moduleGroup_linkNav" activeClassName="moduleGroup_activeRoute" to={"/" + module.id}> {module.id}</NavLink></li>
                ))}
                <li className="moduleGroup_add"><NavLink className="moduleGroup_addNav" activeClassName="moduleGroup_activeRoute" to="/add_module">+</NavLink></li>
                </ul>
                <div className="moduleGroup_content">
                    {Modules?.map(module => (
                        <Route path={"/"+module.id} >
                            <ModulePage moduleName={module.id} />
                        </Route>
                    ))}
                    <Route path="/add_module">
                        <CreateModule/>
                    </Route>
                </div>
            </div>
        </HashRouter>
    )
}
export default ModuleGroup;