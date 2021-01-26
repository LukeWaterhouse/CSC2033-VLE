import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "popper.js";
import "../css-files/disccusionBoard.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "firebase/firestore";
import firebase from "firebase";
import { db } from "../../firebase";
global.jQuery = require("jquery");
require("bootstrap");

function ChatRoom(props) {
  const messagesRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("Threads")
    .doc(props.threadName)
    .collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  console.log(messages);
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setFormValue("");
  };

  return (
    <>
      <div>
        {messages?.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <div
        className="card card-body post-editor"
        style={{ backgroundColor: "#616161" }}
      >
        <div className="panel-body" style={{ backgroundColor: "#616161" }}>
          <form onSubmit={sendMessage}>
            <textarea
              style={{ backgroundColor: "#616161", color: "white" }}
              className="form-control post-editor-input"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
            />
            <button
              className="btn btn-success post-editor-button"
              type="submit"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

function ChatMessage({ message }) {
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
    <div
      className="card card-body post-editor"
      style={{ backgroundColor: "#424242", color: "#E0E0E0" }}
    >
      <p style={{ color: "#9E9E9E" }}>{output}</p>
      {text}{" "}
    </div>
  );
}

function DiscussionBoard(props) {
  return (
    <div>
      <h1 className="text-center">
        <u>Discussion Board</u>
      </h1>
      <ChatRoom threadName={props.input} />
    </div>
  );
}

export default DiscussionBoard;
