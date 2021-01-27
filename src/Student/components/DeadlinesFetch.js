import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import Card from "react-bootstrap/Card";



/**
 * Created by: Luke Waterhouse
 * This file contains a component which fetches the different assignments from all the modules using a for loop. These are
 * then displayed as cards showing the Title, due date and the module they belong to.
 */

export default function DisplayDeadlines() {
  const [Assignments, setAssignments] = useState([]);
  const modules = [];
  const AssignmentsToSet = [];

  //this useEffect pulls a list of all the different module titles so they can be used in a for loop to get the assignments
  //for each module and sets them to the modules array.
  useEffect(() => {
    function returnAssignments() {
      db.collection("Courses")
        .doc("Computer Science")
        .collection("modules")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();
            modules.push(data.Title);
          });
          getAssignments();
        })
        .catch((error) => console.log(error));
    }

    //this function uses the modules array created above to loop through the module titles and extracts the assignments
    //from each one using the module title as the doc path. Then sets the assignments to a useState (Assignments)
    function getAssignments() {
      for (let i = 0; i < modules.length; i++) {
        db.collection("Courses")
          .doc("Computer Science")
          .collection("modules")
          .doc(modules[i])
          .collection("Assignments")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              let output = "error";
              if (snapshot.size > 0) {
                const data = doc.data();

                //checks if a deadline exists before adding it

                if (data.Deadline) {
                  const toDate = data.Deadline && data.Deadline.toDate();
                  const month = toDate.getUTCMonth() + 1;
                  const day = toDate.getUTCDate();
                  const year = toDate.getUTCFullYear();
                  const time =
                    toDate.getUTCHours() + ":" + toDate.getUTCMinutes();
                  output = year + "/" + month + "/" + day + " " + time;
                }

                //adds the assignment to a temporary array

                AssignmentsToSet.push({
                  Title: data.Title,
                  Marks: data.Marks,
                  Module: data.Module,
                  DueDate: output,
                });
                console.log(AssignmentsToSet);
              } else {
              }
            });

            //on the last loop sets the Assignment useState using the temporary array
            if (i === modules.length - 1) {
              setAssignments(AssignmentsToSet);
            }
          });
      }
    }

    returnAssignments();
  }, []);


  //takes in props from assignments and displays them in a bootstrap Card
  function DeadlinePost(props) {
    console.log(props.Title);
    return (
      <Card style={{ width: "30rem", marginLeft: "20px", marginTop: "20px" }}>
        <Card.Body style={{ backgroundColor: "#424242" }}>
          <Card.Title>
            <h5 style={{ color: "white", marginBottom: "30px" }}>
              <u>{props.Title}</u>
            </h5>
          </Card.Title>

          <div style={{ color: "#f9f9f9" }}>
            <b>Due Date:</b> {props.Date}
            <br />
            <b>Module:</b> {props.Module}
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div>
      {Assignments.map((assignmentRef) => (
        <DeadlinePost
          Title={assignmentRef.Title}
          Module={assignmentRef.Module}
          Date={assignmentRef.DueDate.toString()}
        />
      ))}
    </div>
  );
}
