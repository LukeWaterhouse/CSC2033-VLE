import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { Route, NavLink, HashRouter } from "react-router-dom";
import StudentModulePage from "./StudentModulePage";

/**
 * Created by: Mantas Aleskevicius
 * CSS: Mantas Aleskevicius
 * This file dynamically displays all of the modules as tabs and their content below the tabs without switching pages
 */


function StudentModuleGroup() {
  const ModuleRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("modules");

  const [Modules] = useCollectionData(ModuleRef, { idField: "id" });

  //Returns navigation links of all the modules and displays their corresponding page content
  return (
    <HashRouter>
      <div className="moduleGroup">
        <ul className="moduleGroup_links">
          {Modules?.map((module) => (
            <li className="moduleGroup_link">
              <NavLink
                className="moduleGroup_linkNav"
                activeClassName="moduleGroup_activeRoute"
                to={"/" + module.id}
              >
                {" "}
                {module.id}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="moduleGroup_content">
          {Modules?.map((module) => (
            <Route path={"/" + module.id}>
              <StudentModulePage moduleName={module.id} />
            </Route>
          ))}
        </div>
      </div>
    </HashRouter>
  );
}
export default StudentModuleGroup;
