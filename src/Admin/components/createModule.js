import React, { useState } from "react";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

/**
 * Created by: Mantas Aleskevicius
 * CSS: Mantas Aleskevicius
 * This file allows the user to create a module and it's description
 */

function CreateModule() {
  //Pulls all of the modules so they can be checked for duplicates
  const ModuleRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("modules");
  const [Modules] = useCollectionData(ModuleRef, { idField: "id" });
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [visibility, setVisibility] = useState("invisible");
  const [errorMessage, setError] = useState("");

  //Input validation to prevent duplicate modules and modules without a name
  const createModule = async (e) => {
    e.preventDefault();

    let isValid = true;

    Modules.forEach((arrayItem) => {
      if (arrayItem === titleValue) {
        isValid = false;
        setError("There is already a thread with that name!");
      }
    });

    if (titleValue === "") {
      isValid = false;
      setError("You must enter a thread name!");
    }

    if (isValid) {
      setVisibility("invisible");
      setTitleValue("");
      await ModuleRef.doc(titleValue).set({
        Title: titleValue,
        description: descriptionValue,
      });
    } else {
      console.log("Error!");
      setVisibility("visible");
    }
  };

  //Returns a form that allows user to create a module
  return (
    <div>
      <form className="createModule" onSubmit={createModule}>
        <label className="createModule_titleLabel" htmlFor="title">
          Title
        </label>
        <br />
        <input
          className="createModule_titleText"
          id="title"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
        <br />
        <label className="createModule_descriptionLabel" htmlFor="description">
          Description
        </label>
        <br />
        <textarea
          className="createModule_descriptionText"
          id="description"
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}
        />
        <br />
        <button className="createModule_button" type="submit">
          Create
        </button>
        <div className={visibility}>{errorMessage}</div>
      </form>
    </div>
  );
}

export default CreateModule;
