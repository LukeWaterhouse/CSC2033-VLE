import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import "firebase/firestore";
import firebase from "firebase";

function GiveAssignmentFeedback(props) {
  console.log(props.input);
  const [formValue, setFormValue] = useState("");
  const [moduleList, setModuleList] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log("useEffect Ran");
    db.collection("Courses")
      .doc("Computer Science")
      .collection("modules")
      .doc(props.input)
      .collection("Assignments") //This will need to change for user specific course
      .get()
      .then((snapshot) => {
        const modules = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          modules.push(data);
        });
        setModuleList(modules);
        setSelectedModule(modules[0].Title.toString());
        console.log("init:" + selectedModule);
      })
      .catch((error) => console.log(error));
  }, []);

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
      console.log("Sent to: " + selectedModule);
      setFormValue("");
      const feedbackRef = db
        .collection("Courses")
        .doc("Computer Science")
        .collection("modules")
        .doc(props.input)
        .collection("Assignments")
        .doc(selectedModule)
        .collection("feedback");
      await feedbackRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  return (
    <div className="text-dark">
        Assignment Feedback
      <form>
        <select
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.currentTarget.value)}
        >
          {moduleList &&
            moduleList.map((module) => (
              <option key={module.Title} value={module.Title}>
                {module.Title}
              </option>
            ))}

          <input type="submit" value="Submit" />
        </select>
      </form>

      <form onSubmit={sendFeedback}>
        <textarea
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit" className="btn-success">
          Send
        </button>
      </form>

      <div className="text-dark">{errorMessage}</div>
    </div>
  );
}

export default GiveAssignmentFeedback;
