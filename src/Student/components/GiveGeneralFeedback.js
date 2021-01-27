import React, { useState } from "react";
import { db } from "../../firebase";
import firebase from "firebase";
import { Button } from "bootstrap";

/**
 * Created by: Luke Waterhouse
 * This file has functionality to take in the name of a module and push some feedback to it with a form and button
 */



export default function GiveGeneralFeedback(props) {
  const [formValue, setFormValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");



  //this async function takes the module name prop and uses it for the database path to add some feedback for it.
  const sendFeedback = async (e) => {
    e.preventDefault();

    if (formValue === "") {
      setErrorMessage("Please input some text before submitting!");
    } else {
      setErrorMessage(
        "Success! Don't worry, your feedback will be kept anonymous"
      );
      setFormValue("");
      const feedbackRef = db
        .collection("Courses")
        .doc("Computer Science")
        .collection("modules")
        .doc(props.input)
        .collection("feedback");
      await feedbackRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };


  //returns a form and button which sends the feedback using the sendFeedback function
  return (
    <div className="text-dark">
      <h5 className="text-md-center"> General Feedback</h5>

      <form onSubmit={sendFeedback}>
        <textarea
          style={{ width: "660px" }}
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <br />
        {errorMessage}
        <br />

        <button type="submit" className="btn-success">
          Send
        </button>
      </form>
    </div>
  );
}
