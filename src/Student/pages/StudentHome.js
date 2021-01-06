import React from 'react'
import StudentNavBar from "../../Student/NavBar/StudentNavBar";
import CSS from "../../Student/css-files/StudentHome.css";

class StudentHome extends React.Component {


    render() {
        return (

            <div>
                <StudentNavBar/>
                <h2>Student Home</h2>
            </div>
        );
    }
}

export default StudentHome
