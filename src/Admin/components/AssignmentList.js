import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import Button from "react-bootstrap/Button";

/**
 * Created by: Luke Waterhouse
 * This file contains a component which takes the module name passed into it as a prop, and then provides a dropdown
 * menu to select the different assignments for that module and displays them in cards.
 */

export default function AssignmentList(props) {
  const [AssignmentList, setAssignmentList] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState("placeholder");
  const [AssignmentFeedbackList, setAssignmentFeedbackList] = useState([]);
  const [noFeedbackVisible, setNoFeedbackVisible] = useState("invisible");

  // This useEffect pulls the assignments of a module and pushes it to a useState, it also sets the initially picked assignment
  // as the first one in this array.
  useEffect(() => {
    const setAssignmentInfo = () => {
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
          setSelectedAssignment(assignments[0].Title);
        })
        .catch((error) => console.log(error));
    };
    setAssignmentInfo();
  }, []);

  // This function gets the feedback for a particular assignment using the module prop as well as the selected Assignment useSate
  // set in the useEffect above. It then sets these assignments to the AssignmentFeedbackList useState
  function getAssignmentFeedbackList() {
    setAssignmentFeedbackList([]);

    const setAssignmentFeedbackListInfo = () => {
      setNoFeedbackVisible("invisible");
      db.collection("Courses")
        .doc("Computer Science")
        .collection("modules")
        .doc(props.input)
        .collection("Assignments")
        .doc(selectedAssignment)
        .collection("feedback")
        .orderBy("createdAt")
        .get()
        .then((snapshot) => {
          const feedback = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            feedback.push(data);
          });
          if (feedback.length === 0) {
            setNoFeedbackVisible("visible");
          }

          setAssignmentFeedbackList(feedback);
        })

        .catch((error) => console.log(error));
    };

    setAssignmentFeedbackListInfo();
  }

  // This component takes in message object and uses the fields to create a card with the Date formatted and the text.
  function FeedbackMessage({ message }) {
    const { text, createdAt } = message;
    const date = createdAt && createdAt.toDate();
    let output = "DataBase Error!";
    if (date != null) {
      const month = date.getUTCMonth() + 1;
      const day = date.getUTCDate();
      const year = date.getUTCFullYear();
      const time = date.getUTCHours() + ":" + date.getUTCMinutes();
      output = year + "/" + month + "/" + day + " " + time;
    }
    return (
      <div
        className="card card-body post-editor text-light"
        style={{ backgroundColor: "#424242" }}
      >
        <p style={{ color: "" }}>{output}</p>
        {text}{" "}
      </div>
    );
  }

  return (
    <div className=" align-content-center" style={{ paddingLeft: "20px" }}>
      <h2
        style={{ paddingTop: "60px", paddingBottom: "20px" }}
        className="text-md-center text"
      >
        <u>Assignment Feedback</u>
      </h2>
      <form>
        <select
          style={{
            backgroundColor: "#1A1A1B",
            color: "white",
            borderRadius: "4px",
          }}
          className="custom-select-sm"
          value={selectedAssignment}
          onChange={(e) => setSelectedAssignment(e.currentTarget.value)}
        >
          {AssignmentList &&
            AssignmentList.map((module) => (
              <option key={module.Title} value={module.Title}>
                {module.Title}
              </option>
            ))}
        </select>
      </form>

      <div style={{ paddingTop: "10px" }}>
        <Button
          onClick={getAssignmentFeedbackList}
          variant="success"
          style={{ backgroundColor: "#1A1A1B" }}
        >
          View
        </Button>
      </div>

      <div className="text-md-center border-danger">
        <h5 className={noFeedbackVisible}>
          There doesn't seem to be any feedback for this assignment yet, perhaps
          ask your students to submit some{" "}
        </h5>
      </div>

      <div>
        {AssignmentFeedbackList?.map((message) => (
          <FeedbackMessage key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}
