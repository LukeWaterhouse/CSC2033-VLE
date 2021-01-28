import React from "react";
import { db } from "../../firebase";

/**
 * Created by: Mantas Aleskevicius
 * CSS: Mantas Aleskevicius
 * This file deletes modules form the database
 */

function DeleteModule({ thisId }) {
  //Creating a reference to the modules
  const ModuleRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("modules");

  //Deleting the module by its id
  async function deleteModule(id) {
    await ModuleRef.doc(id).delete();
  }

  //Returns a delete button
  return (
    <div className="deleteModule">
      <button
        className="deleteModule_button"
        onClick={(e) => {
          if (
            window.confirm(
              "Are you sure you wish to delete module " + thisId + "?"
            )
          )
            deleteModule(thisId);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteModule;
