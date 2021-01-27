import React, {useEffect} from 'react'
import moment from 'moment'
import firebase from "firebase";
import {db} from "../../firebase";
import {Button} from "react-bootstrap";


function FinishedGrading(props) {

    console.log(props);

    function handleClick() {
        db.collection("Courses")
            .doc("Computer Science")
            .collection("modules")
            .doc(props.props.module)
            .collection("Assignments")
            .doc(props.props.input)
            .update({
                Graded: true,
            })
            .then(() => {
                alert("Student has been Graded!");
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    return(
        <div className="mb-2">
            <Button variant="info" size="lg" onClick={handleClick}>
                Finished
            </Button>
        </div>
    )
}

export default FinishedGrading;