import React from "react";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

/**
 * Created by: Luke Waterhouse
 * This file contains functionality to display the Threads from the database to take you to the different thread pages
 */

//this function pulls the Threads and pushes them to an array
function StudentThreadsList() {
  const ThreadsRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("Threads");
  const [Threads] = useCollectionData(ThreadsRef, { idField: "id" });

  //maps through the Thread objects passing each one to a Thread component
  return (
    <div>
      <h1
        className="text-md-center"
        style={{ marginTop: "30px", marginBottom: "30px" }}
      >
        <u>Threads</u>
      </h1>
      {Threads?.map((thread) => (
        <Thread key={thread.id} ThreadTitle={thread} />
      ))}
    </div>
  );
}

//this function takes in a Thread object and displays it as a link to a router variable url
function Thread({ ThreadTitle }) {
  const { Title } = ThreadTitle;
  const pathTitle = "/StudentDiscussion/" + Title;
  return (
    <div className="card-header border-white border-top text-md-center">
      <h5>
        <Button variant="secondary" style={{ background: "#424242" }}>
          <Link style={{ color: "white" }} to={pathTitle}>
            {Title}
          </Link>
        </Button>
      </h5>
    </div>
  );
}

export default StudentThreadsList;
