import React from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import Threads from "../components/Threads";
import CreateThread from "../components/createThread";
import DeleteThread from "../components/deleteThread";


function AdminThreads() {
    return(

        <div>
            <AdminNavBar/>
            <CreateThread/>
            <DeleteThread/>
            <Threads/>
        </div>
    )
}

export default AdminThreads