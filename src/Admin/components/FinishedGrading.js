import React from 'react'
import {db} from "../../firebase";
import {Button} from "react-bootstrap";
import {useDocumentData} from "react-firebase-hooks/firestore";


function FinishedGrading(props) {

    //Checking the values in props are as desired.
    console.log(props);

    //Creates an Object list from the current assignments document data in the firebase
    const AssignRef = db
        .collection("Courses")
        .doc("Computer Science")
        .collection("modules")
        .doc(props.module)
        .collection("Assignments")
        .doc(props.input);
    const [ass] = useDocumentData(AssignRef);

    //Checking to see if its the right value.
    console.log(ass)


    function handleClick() {
        db.collection("Courses")
            .doc("Computer Science")
            .collection("modules")
            .doc(props.module)
            .collection("Assignments")
            .doc(props.input)
            .update({ //Updates the field Graded in the current assignment.
                Graded: true,
            })
            .then(() => {
                alert("This Assignment has been graded!");
            })
            .catch((error) => {
                alert(error.message);
            });
    }


        return(//Displays a button that when clicked changes the assignment from ungraded to graded.
            <div>
                <h3>Finished Grading?</h3>
                <div className="mb-2">
                    <Button variant="info" size="lg" onClick={handleClick}>
                        Finished
                    </Button>
                </div>
            </div>
        );

}

export default FinishedGrading;