import React from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import tempModules from "../../DataAnalysis/TempModules"
import Module from "../components/Module";

class AdminClasses extends React.Component {
  render() {
    return (
      <div>
        <AdminNavBar />
        <h2>Admin Classes</h2>
          <div className="moduleOptions">
              {tempModules.map(module => (<Module
                id={module.id}
                name={module.name}
                mLeader={module.mLeader}
              />)) }
          </div>
      </div>
    );
  }
}

export default AdminClasses;
