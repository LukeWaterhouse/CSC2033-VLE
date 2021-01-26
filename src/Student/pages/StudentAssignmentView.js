import React, { useState, useEffect } from "react";
import StudentNavBar from "../NavBar/StudentNavBar";
import "firebase/firestore";
import StudentAssignmentList from "../components/StudentAssignmentList";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

class StudentAssignmentView extends React.Component{
    render() {
        console.log(this.props);
        console.log(this.props.match.params);
        const module = this.props.match.params.module;
        return (
            <div>
                <StudentNavBar/>
                <h2>Assignments</h2>
                <div style={{paddingLeft:"20px",paddingTop:"30px"}}>
                    <Link to="/StudentAssignment">
                        <Button variant="secondary" style={{backgroundColor:"#1A1A1B"}}>
                            Back to Assignments
                        </Button>
                    </Link>
                </div>
                <br/>
                <StudentAssignmentList module={module}/>
            </div>
        );
    }

}

export default StudentAssignmentView;