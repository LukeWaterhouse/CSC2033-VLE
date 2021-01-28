import React from "react";
import moment from "moment";
import { db } from "../../firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Card from "react-bootstrap/Card";

/**
 * Created by: Giorgos Christodoulou
 * This file contains a component which fetches the selected assignments fields from the firebase
 * and displays them as details in a card.
 */

const StudentAssignmentDetailsComp = (props) => {
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
  console.log(ass);

  if (ass) {
    //Checks if an assignment exists and proceeds to display a card with its information.
    return (
      <div>
        <div className="card-header border-white border-top">
          <div>
            <Card
              bg={"Info".toLowerCase()}
              text={"Info".toLowerCase() === "light" ? "dark" : "white"}
            >
              <Card.Body>
                <Card.Text>
                  <h4>{ass.Title}</h4>
                  <br />
                  <p>{ass.Instructions}</p>
                  <p>Module: {ass.Module}</p>
                  <p>Marks: {ass.Marks}</p>
                  <p>Deadline: {moment(ass.Deadline.toDate()).calendar()}</p>
                  <div className="text-black-50">Posted by Someone</div>
                  <div className="text-black-50">
                    {moment(ass.createdAt.toDate()).calendar()}
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      //If assignment doesnt exist, displays this.
      <div className="container center">
        <p>Loading project...</p>
      </div>
    );
  }
};

export default StudentAssignmentDetailsComp;
