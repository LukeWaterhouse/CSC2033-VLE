import React, { useState } from "react";
import { db } from "../../firebase";

function DeleteThread() {
  const [formValue, setFormValue] = useState("");
  const ThreadsRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("Threads");

  async function deleteThread() {
    await ThreadsRef.doc(formValue).delete();
    setFormValue("");
  }

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
