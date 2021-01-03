import React from "react";
import DiscussionBoard from "../components/DiscussionBoard";
import StudentNavBar from "../NavBar/StudentNavBar";
import Threads from "../components/Threads";


function StudentThreads() {
    return(

        <div>
            <StudentNavBar/>
            <Threads/>
        </div>
    )
}

export default StudentThreads