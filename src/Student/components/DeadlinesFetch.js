import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import Card from "react-bootstrap/Card";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function DisplayDeadlines() {
  const [Assignments, setAssignments] = useState([]);
  const [Modules, SetModules] = useState([]);

  const things = [];
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
            things.push(data.Title);
          });
          console.log("things:", things);
          SetModules(things);
          console.log(Modules, "Modules");
          getAssignments()
        })
        .catch((error) => console.log(error));
    }

    function getAssignments() {
      for (let i = 0; i < things.length; i++) {
        db.collection("Courses")
          .doc("Computer Science")
          .collection("modules")
          .doc(things[i])
          .collection("Assignments")
          .get()
          .then((snapshot) => {

            snapshot.forEach((doc) => {
              const data = doc.data();
              console.log("current Assignment",data.Title);
              const toDate = data.Deadline.toDate()
                const month = toDate.getUTCMonth() + 1;
                const day = toDate.getUTCDate();
                const year = toDate.getUTCFullYear();
                const time = toDate.getUTCHours() + ":" + toDate.getUTCMinutes();
                const output = year + "/" + month + "/" + day + " " + time;
              AssignmentsToSet.push({
                  Title: data.Title,
                  Marks: data.Marks,
                  Module: data.Module,
                  DueDate: output

              });


            });

            if (i===things.length-1){
                setAssignments(AssignmentsToSet)


            }


          });
      }
    }


    returnAssignments();
  }, []);

  function DeadlinePost(props) {

      console.log(props.Title)
    return (
      <Card style={{ width: "18rem", marginLeft: "10px", marginTop: "10px",}}>
        <Card.Body style={{backgroundColor:"#424242"}}>
          <Card.Title>
            <h5 style={{ color: "white" }}><u>{props.Title}</u></h5>
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

  return <div>

      {Assignments.map(thing => <DeadlinePost Title={thing.Title} Module={thing.Module} Date={thing.DueDate.toString()}/>)}

      </div>;
}
