import React, { useState } from "react";
import { db } from "../../firebase";



/**
 * Created by: Luke Waterhouse
 * This file contains a component which allows the user to input one of the existing Threads into a form and then delete
 * it from the database.
 */



//pulls the threads so that one can be deleted
function DeleteThread() {
  const [formValue, setFormValue] = useState("");
  const ThreadsRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("Threads");


  //deletes a thread if it exists
  async function deleteThread() {
    await ThreadsRef.doc(formValue).delete();
    setFormValue("");
  }

  //returns a button to delete a thread with the deleteThread() function
  return (
    <div style={{ marginLeft: "20px" }}>
      Delete Thread
      <form onSubmit={deleteThread}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button className="btn-danger" type="submit">
          Delete
        </button>
      </form>
    </div>
  );
}

export default DeleteThread;
