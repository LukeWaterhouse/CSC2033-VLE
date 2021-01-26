import React, { useState } from "react";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

function CreateModule() {
  const ModuleRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("modules");
  const [Modules] = useCollectionData(ModuleRef, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const [visibility, setVisibility] = useState("invisible");
  const [errorMessage, setError] = useState("");

  const createModule = async (e) => {
    e.preventDefault();

    let isValid = true;

    Modules.forEach((arrayItem) => {
      if (arrayItem === formValue) {
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
      await ModuleRef.doc(formValue).set({
        Title: formValue,
      });
    } else {
      console.log("Error!");
      setVisibility("visible");
    }
  };

  return (
    <div>
      <form onSubmit={createModule}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">Create</button>
        <div className={visibility}>{errorMessage}</div>
      </form>
    </div>
  );
}

export default CreateModule;
