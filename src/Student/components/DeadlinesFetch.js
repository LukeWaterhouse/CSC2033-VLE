import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import Card from "react-bootstrap/Card";



/**
 * General component description in JSDoc format. Markdown is *supported*.
 */

export default function DisplayDeadlines() {
  const [Assignments, setAssignments] = useState([]);
  const [Modules, SetModules] = useState([]);

  const modules = [];
  const AssignmentsToSet = [];

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
          console.log("things:", modules);
          SetModules(modules);    ``
          console.log(Modules, "Modules");
          getAssignments();
        })
        .catch((error) => console.log(error));
    }

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

                if (data.Deadline) {
                  const toDate = data.Deadline && data.Deadline.toDate();
                  const month = toDate.getUTCMonth() + 1;
                  const day = toDate.getUTCDate();
                  const year = toDate.getUTCFullYear();
                  const time =
                    toDate.getUTCHours() + ":" + toDate.getUTCMinutes();
                  output = year + "/" + month + "/" + day + " " + time;
                }

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

            if (i === modules.length - 1) {
              setAssignments(AssignmentsToSet);
            }
          });
      }
    }

    returnAssignments();
  }, []);

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
