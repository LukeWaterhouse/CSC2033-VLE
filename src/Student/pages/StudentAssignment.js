import React, { useState, useEffect } from "react";
import StudentNavBar from "../NavBar/StudentNavBar";
import "firebase/firestore";

class StudentAssignment extends React.Component{
    render() {
        return (
            <div>
                <StudentNavBar/>
                <h1>Assignments</h1>

            </div>
        );
    }

}

export default StudentAssignment;