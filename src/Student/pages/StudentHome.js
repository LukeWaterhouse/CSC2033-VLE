import React from 'react'
import {db,auth} from '../../firebase'
import StudentNavBar from "../../Student/NavBar/StudentNavBar";

class StudentHome extends React.Component {


    render() {
        return (

            <div>
                <StudentNavBar/>
                <h2>StudentHome</h2>

            </div>
        );
    }
}

export default StudentHome
