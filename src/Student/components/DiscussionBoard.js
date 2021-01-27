import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "popper.js";
import "../css-files/disccusionBoard.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "firebase/firestore";
import firebase from "firebase";
import { db } from "../../firebase";
global.jQuery = require("jquery");
require("bootstrap");


/**
 * Created by: Luke Waterhouse
 * This file contains components which display all of the messages from a particular thread as well as a function to send messages
 * to the thread in the database
 *
 */


let userName = "placeholder"
let isAdmin = false



function ChatRoom(props) {

  useEffect( () => {

    db.collection("UserDetails").doc(firebase.auth().currentUser.uid).get().then(doc => {

      userName = doc.data().username
      isAdmin = doc.data().isAdmin

    })

  })



  const messagesRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("Threads")
    .doc(props.threadName)
    .collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  console.log(messages);
  console.log("userID: ",firebase.auth().currentUser.uid)

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();


    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      userName: userName,
      AdminMessage: isAdmin
    });
    setFormValue("");




  };

  return (
    <>
      <div>
        {messages?.map((message) => (
            <div style={{marginBottom:"10px"}}>
          <ChatMessage key={message.id} message={message} />
            </div>
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
  const { text, createdAt,userName,AdminMessage } = message;
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
      <h7 style={AdminMessage?{color:"green",marginBottom:"5px",fontWeight:"bold"}:{color: "white",marginBottom: "5px"}}><u>{AdminMessage ? <p>{userName} (Admin)</p> : <p>{userName}</p>}</u></h7>
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
