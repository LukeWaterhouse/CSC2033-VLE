import React from "react";
import { db } from "../../firebase";

function DeleteModule({thisId}){
    const ModuleRef = db.collection("Courses")
        .doc("Computer Science")
        .collection("modules");

    async function deleteModule(id) {
        await ModuleRef.doc(id).delete();
    }

    return (
        <div>
            <button  onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) deleteModule(thisId) } }>
                Delete
            </button>
        </div>
    );
}

export default DeleteModule;
