import React from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import moment from "moment";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Card from "react-bootstrap/Card";
import { CardColumns } from "react-bootstrap";

function AssignmentsListed(props) {
  const AssRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("modules")
    .doc(props.module)
    .collection("Assignments");
  const query = AssRef.orderBy("createdAt");
  const [assignment] = useCollectionData(query, { idField: "id" });
  console.log(assignment);

  return (
    <div className="Assignments">
      {assignment &&
        assignment.map((assignment) => {
          if (assignment.Deadline > new Date().getDate() || !assignment.Graded) { //Splits up assignments into finished ones and pending ones.
            return (
                <div>
                  <CardColumns>
                    <Link
                        to={
                          "/StudentAssignmentDetails/" +
                          props.module +
                          "/" +
                          assignment.id
                        }
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
                        <Card.Header>{assignment.Module}</Card.Header>
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
          }else {
            return; //Doesn't show any assignments that are not pending.
          }
        })}
    </div>
  );
}

export default AssignmentsListed;
