import React, { useEffect } from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

function GetFeedback(props) {
  const feedbackRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("modules")
    .doc(props.moduleName)
    .collection("feedback");
  const query = feedbackRef.orderBy("createdAt").limit(25);
  const [feedback] = useCollectionData(query, { idField: "id" });
  console.log(feedback);
  return (
    <div>
      <div>
        {feedback?.map((message) => (
          <FeedbackMessage key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}

function FeedbackMessage({ message }) {
  const { text, createdAt } = message;
  const date = createdAt && createdAt.toDate(); // checks if createdAt exists and if so turns it into JS date format
  let output = "DataBase Error!";
  if (date != null) {
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const time = date.getUTCHours() + ":" + date.getUTCMinutes();
    output = year + "/" + month + "/" + day + " " + time;
  }
  return (
    <div className="card card-body post-editor text-dark">
      <p className="text-black-50">{output}</p>
      {text}{" "}
    </div>
  );
}

function ViewFeedbackPageComp(props) {
  return (
    <div>
      <h1 className="text-md-center">{props.input} Feedback</h1>
      <GetFeedback moduleName={props.input} />
    </div>
  );
}

export default ViewFeedbackPageComp;
