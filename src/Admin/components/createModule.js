import React, { useState } from "react";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

function CreateModule(){
    const ModuleRef = db.collection("Courses")
        .doc("Computer Science")
        .collection("modules");
    const [Modules] = useCollectionData(ModuleRef, { idField: "id"});
    const [titleValue, setTitleValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [visibility, setVisibility] = useState("invisible");
    const [errorMessage, setError] = useState("");

    const createModule = async (e) => {
        e.preventDefault();

        let isValid = true;

        Modules.forEach(arrayItem => {
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

    return (
        <div>
            <form className="createModule" onSubmit={createModule}>
                <label className="createModule_titleLabel" htmlFor="title">Title</label>
                <br/>
                <input
                    className="createModule_titleText"
                    id="title"
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                />
                <br/>
                <label className="createModule_descriptionLabel" htmlFor="description">Description</label>
                <br/>
                <textarea
                    className="createModule_descriptionText"
                    id="description"
                    value={descriptionValue}
                    onChange={(e) => setDescriptionValue(e.target.value)}
                />
                <br/>
                <button className="createModule_button" type="submit">
                    Create
                </button>
                <div className={visibility}>{errorMessage}</div>
            </form>
        </div>
    );
}

export default CreateModule;
