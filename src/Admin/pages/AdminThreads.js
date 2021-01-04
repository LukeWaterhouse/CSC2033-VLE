import React from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import Threads from "../components/Threads";
import CreateThread from "../components/createThread";


function AdminThreads() {
    return(

        <div>
            <AdminNavBar/>
            <CreateThread/>
            <Threads/>
        </div>
    )
}

export default AdminThreads