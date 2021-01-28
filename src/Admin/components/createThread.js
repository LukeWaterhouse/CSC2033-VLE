import React, { useState } from "react";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

/**
 * Created by: Luke Waterhouse
 * This file contains a component for creating a new thread in the database and is used on the Admin side on the Threads
 * page. The user can input the name of a new thread into a form and then press create which will then add it to firebase
 * and it will appear dynamically in the list of threads.
 */

function CreateThread() {
  const [formValue, setFormValue] = useState("");
  const [visibility, setVisibility] = useState("invisible");
  const [errorMessage, setError] = useState("");

  // pulls the threads from the database so they can be checked
  const ThreadsRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("Threads");
  const [Threads] = useCollectionData(ThreadsRef, { idField: "id" });

  //creates a thread with input validation using the pulled threads
  const createThread = async (e) => {
    e.preventDefault();

    let isValid = true;

    Threads.forEach(function (arrayItem) {
      if (arrayItem.Title === formValue) {
        isValid = false;
        setError("There is already a thread with that name!");
      }
    });

    if (formValue === "") {
      isValid = false;
      setError("You must enter a thread name!");
    }

    if (isValid) {
      setVisibility("invisible");
      setFormValue("");
      await ThreadsRef.doc(formValue).set({
        Title: formValue,
      });
    } else {
      setVisibility("visible");
    }
  };

  //returns a form with a button to create a thread with the input name
  return (
    <div style={{ marginLeft: "20px", marginTop: "20px" }}>
      Create Thread
      <form onSubmit={createThread}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button className="btn-success" type="submit">
          Create
        </button>
        <div className={visibility}>{errorMessage}</div>
      </form>
    </div>
  );
}

export default CreateThread;
