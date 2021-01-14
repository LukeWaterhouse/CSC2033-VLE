import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function AssignmentList(props) {
  const [AssignmentList, setAssignmentList] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState("placeholder");
  const [AssignmentFeedbackList, setAssignmentFeedbackList] = [];

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
        setSelectedAssignment(AssignmentList[0]);
        console.log("Assignments: " + assignments);
        console.log("Selected: " + assignments[0].Title);
      })
      .catch((error) => console.log(error));
  }, []);

  function getAssignmentFeedbackList(props) {
    const AssignmentsRef = db
      .collection("Courses")
      .doc("Computer Science")
      .collection("modules")
      .doc(props.Module)
      .collection("Assignments")
      .doc(props.Assignment)
      .collection("feedback");

    return <div></div>;
  }

  return (
    <div>
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
    </div>
  );
}
