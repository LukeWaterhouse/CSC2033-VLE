import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import "firebase/firestore";
import firebase from "firebase";
import Button from "react-bootstrap/Button";


/**
 * Created by: Luke Waterhouse
 * this file contains functionality to select any assignment from the selected module using a dropdown menu and send feedback
 * to the database for it
 */
function GiveAssignmentFeedback(props) {
  const [formValue, setFormValue] = useState("");
  const [assignmentList, setAssignmentList] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  //this useEffect pulls the assignments of a particular module depending on the prop passed in and pushes it to an array.
  //it then sets this as a useState and sets the initially selected assignment as the first one in the array.

  useEffect(() => {
    db.collection("Courses")
      .doc("Computer Science")
      .collection("modules")
      .doc(props.input)
      .collection("Assignments")
      .get()
      .then((snapshot) => {
        const assignments = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          assignments.push(data);
        });
        setAssignmentList(assignments);
        setSelectedAssignment(assignments[0].Title.toString());
      })
      .catch((error) => console.log(error));
  }, []);

  //this async function first checks if the user has inputted text, if true it takes the selected assignment and adds some feedback
  //to it in the database

  const sendFeedback = async (e) => {
    e.preventDefault();

    if (formValue === "") {
      setErrorMessage("Please input some text before submitting!");
    } else {
      setErrorMessage(
        "Success! Don't worry, your feedback will be kept anonymous"
      );
      setFormValue("");
      const feedbackRef = db
        .collection("Courses")
        .doc("Computer Science")
        .collection("modules")
        .doc(props.input)
        .collection("Assignments")
        .doc(selectedAssignment)
        .collection("feedback");
      await feedbackRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };


  //returns a dropdown menu which dynamically changes with whatever assignments are in the module selected.
  //you may then select one and send feedback for it.
  return (
    <div className="text-dark">
      <h5 style={{marginTop:"10px"}} className="text-md-center">Assignment Feedback</h5>
      <form>
        <select
          style={{ marginBottom: "10px" ,marginLeft:"15px"}}
          value={selectedAssignment}
          onChange={(e) => setSelectedAssignment(e.currentTarget.value)}
        >
          {assignmentList &&
            assignmentList.map((module) => (
              <option key={module.Title} value={module.Title}>
                {module.Title}
              </option>
            ))}

          <input type="submit" value="Submit" />
        </select>
      </form>

      <form onSubmit={sendFeedback}>
        <textarea
          style={{ width: "640px", marginLeft:"15px" }}
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <div style={{marginLeft:"15px"}} className="text-dark">{errorMessage}</div>

        <Button style={{marginLeft:"15px"}} type="submit" className="btn-success">
          Send
        </Button>
      </form>
    </div>
  );
}

export default GiveAssignmentFeedback;
