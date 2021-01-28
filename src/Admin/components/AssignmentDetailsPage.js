import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { db } from "../../firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Card from "react-bootstrap/Card";

const AssignmentDetailsPage = (props) => {

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
    return (//Checks if an assignment exists and proceeds to display a card with its information.
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
                  <div className="text-black-50">Posted by {ass.createdBy}</div>
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
    return (//If assignment doesnt exist, displays this.
      <div className="container center">
        <p>Loading project...</p>
      </div>
    );
  }
};

export default AssignmentDetailsPage;
