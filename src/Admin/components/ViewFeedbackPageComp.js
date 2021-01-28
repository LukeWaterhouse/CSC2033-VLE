import React, { useState } from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "../css-files/feedback.css";

/**
 * Created by: Luke Waterhouse
 * This file contains component that take in a module as a prop and display the feedback for it from the database.
 */

function GetFeedback(props) {
  const feedbackRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("modules")
    .doc(props.moduleName)
    .collection("feedback");
  const query = feedbackRef.orderBy("createdAt").limit(25);
  const [feedback] = useCollectionData(query, { idField: "id" });
  const error = "";
  console.log(feedback);
  return (
    <div>
      <div>
        <h3 className="text-md-center">General feedback</h3>

        {feedback?.map((message) => (
          <FeedbackMessage
            key={message.id}
            message={message}
            style={{ padding: "90px" }}
          />
        ))}

        {feedback?.length ? (
          error
        ) : (
          <h4 className="text-md-center">
            There doesn't seem to be any general feedback for this module yet,
            try asking your students to add some
          </h4>
        )}
      </div>
    </div>
  );
}

//takes in a piece of feedback object and destructures it to display it in a card.

function FeedbackMessage({ message }) {
  const { text, createdAt } = message;
  const date = createdAt && createdAt.toDate();
  let output = "DataBase Error!";
  if (date != null) {
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const time = date.getUTCHours() + ":" + date.getUTCMinutes();
    output = year + "/" + month + "/" + day + " " + time;
  }
  return (
    <div
      className="card card-body post-editor"
      style={{ backgroundColor: "#424242", color: "#E0E0E0" }}
    >
      <p style={{ color: "#9E9E9E" }}>{output}</p>
      {text}{" "}
    </div>
  );
}

function ViewFeedbackPageComp(props) {
  return (
    <div>
      <h1 style={{ paddingBottom: "40px" }} className="text-md-center">
        <u>{props.input}</u>
      </h1>
      <GetFeedback moduleName={props.input} />
    </div>
  );
}

export default ViewFeedbackPageComp;
