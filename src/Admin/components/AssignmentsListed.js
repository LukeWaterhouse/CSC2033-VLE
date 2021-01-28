import React from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import moment from "moment";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Card from "react-bootstrap/Card";
import { CardColumns } from "react-bootstrap";

function AssignmentsListed(props) {

  //Get an Array of Object lists with each assignments fields.
  const AssRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("modules")
    .doc(props.input)
    .collection("Assignments");
  const query = AssRef.orderBy("createdAt");
  const [assignment] = useCollectionData(query, { idField: "id" });
  console.log(assignment);

  return ( //Displays the assignments one after the other, as cards in a list.
    <div className="Assignments">
      {assignment &&
        assignment.map((assignment) => {
          if (assignment.Deadline < new Date().getDate() || !assignment.Graded) { //Splits up assignments into finished ones and pending ones.
            return (
                <div>
                  <h4>Pending Assignment</h4>
                  <CardColumns>
                    <Link
                        to={"/AssignmentDetails/" + props.input + "/" + assignment.id}
                        key={assignment.id}
                    >
                      <Card
                          bg={"Info".toLowerCase()}
                          text={
                            "Info".toLowerCase() === "light" ? "dark" : "white"
                          }
                          style={{width: "18rem"}}
                          className="card-header border-white border-top"
                      >
                        <Card.Header>Assignment</Card.Header>
                        <Card.Body>
                          <Card.Title>{assignment.Title}</Card.Title>
                          <Card.Text>
                            <p>Posted by {assignment.createdBy}</p>
                          </Card.Text>
                          <Card.Text>
                            <small className="text-muted text-black-50">
                              Created{" "}
                              {moment(assignment.createdAt.toDate()).calendar()}
                            </small>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </CardColumns>
                </div>
            );
          }else{
            return(//If assignment is past deadline or graded, displays this.
                <div>
                  <h4>Finished Assignment</h4>
                  <CardColumns>
                    <Link
                        to={"/AssignmentDetails/" + props.input + "/" + assignment.id}
                        key={assignment.id}
                    >
                      <Card
                          bg={"Secondary".toLowerCase()}
                          text={
                            "Secondary".toLowerCase() === "light" ? "dark" : "white"
                          }
                          style={{width: "18rem"}}
                          className="card-header border-white border-top"
                      >
                        <Card.Header>Assignment</Card.Header>
                        <Card.Body>
                          <Card.Title>{assignment.Title}</Card.Title>
                          <Card.Text>
                            <p>Posted by {assignment.createdBy}</p>
                          </Card.Text>
                          <Card.Text>
                            <small className="text-muted text-black-50">
                              Created{" "}
                              {moment(assignment.createdAt.toDate()).calendar()}
                            </small>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </CardColumns>
                </div>
            );
          }
        },)}
    </div>
  );
}

export default AssignmentsListed;
