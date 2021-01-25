import React from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import ModuleGroup from "../components/ModuleGroup"
import "../css-files/AdminClasses.css"

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
