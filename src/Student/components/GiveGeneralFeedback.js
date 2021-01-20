import React, { useState } from "react";
import { db } from "../../firebase";
import firebase from "firebase";
import {Button} from 'bootstrap'

export default function GiveGeneralFeedback(props) {
  const [formValue, setFormValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const sendFeedback = async (e) => {
    e.preventDefault();

    console.log(formValue);
    if (formValue === "") {
      setErrorMessage("Please input some text before submitting!");
    } else {
      setErrorMessage(
        "Success! Don't worry, your feedback will be kept anonymous"
      );
      console.log("Send Feedback");
      console.log(props.input);
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

  return (
    <div className="text-dark">
      <h5 className="text-md-center">      This is the General feedback
      </h5>

      <form onSubmit={sendFeedback}>
        <textarea style={{width:"660px"}}
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        /><br/>
        {errorMessage}
        <br/>

        <button type="submit" className="btn-success">
          Send
        </button>
      </form>
    </div>
  );
}
