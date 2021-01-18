import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function AssignmentList(props) {
  const [AssignmentList, setAssignmentList] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState("placeholder");
  const [AssignmentFeedbackList, setAssignmentFeedbackList] = useState([]);
  const [noFeedbackVisible, setNoFeedbackVisible] = useState("invisible");

  useEffect(() => {
    const setAssignmentInfo = () => {
      console.log("gosh: " + props.input);
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
          console.log("Assignments: " + assignments);
          console.log("Selected: " + assignments[0].Title);
        })
        .catch((error) => console.log(error));
    };
    setAssignmentInfo();
  }, []);

  function getAssignmentFeedbackList() {
    console.log("Selected in other function: " + selectedAssignment);
    console.log("props in other function: " + props.input);
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
          console.log(feedback.length);
          if (feedback.length === 0) {
            setNoFeedbackVisible("visible");
            console.log("undefined!!!");
          }

          setAssignmentFeedbackList(feedback);
        })

        .catch((error) => console.log(error));
    };

    setAssignmentFeedbackListInfo();

    console.log("Help:" + AssignmentFeedbackList);
    console.log("looping?");
  }

  function FeedbackMessage({ message }) {
    const { text, createdAt } = message;
    const date = createdAt && createdAt.toDate(); // checks if createdAt exists and if so turns it into JS date format
    let output = "DataBase Error!";
    if (date != null) {
      const month = date.getUTCMonth() + 1;
      const day = date.getUTCDate();
      const year = date.getUTCFullYear();
      const time = date.getUTCHours() + ":" + date.getUTCMinutes();
      output = year + "/" + month + "/" + day + " " + time;
    }
    return (
      <div className="card card-body post-editor text-dark">
        <p className="text-black-50">{output}</p>
        {text}{" "}
      </div>
    );
  }

  return (
    <div>
      <h3>Assignment Specific Feedback</h3>

      <form>
        <select
          value={selectedAssignment}
          onChange={(e) => setSelectedAssignment(e.currentTarget.value)}
        >
          {AssignmentList &&
            AssignmentList.map((module) => (
              <option key={module.Title} value={module.Title}>
                {module.Title}
              </option>
            ))}

          <input type="submit" value="Submit" />
        </select>
      </form>
      <button onClick={getAssignmentFeedbackList}>View</button>
      <h5 className={noFeedbackVisible}>
        There doesn't seem to be any feedback for this assignment yet, perhaps
        ask your students to submit some{" "}
      </h5>

      <div>
        {AssignmentFeedbackList?.map((message) => (
          <FeedbackMessage key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}
