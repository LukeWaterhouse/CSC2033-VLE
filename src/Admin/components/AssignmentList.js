import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function AssignmentList(props) {
  const [AssignmentList, setAssignmentList] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState("placeholder");
  const [AssignmentFeedbackList, setAssignmentFeedbackList] = useState([]);
  console.log("Main Component Inpu:" +props.input)

  useEffect(() => {
      console.log("WTFF")

      const setAssignmentInfo =  () => {
          console.log("gosh: "+props.input)
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
              }).catch((error) => console.log(error));

      }
      setAssignmentInfo()


  }, []);

  function getAssignmentFeedbackList() {
      console.log("Selected in other function: "+selectedAssignment)
      console.log("props in other function: "+props.input)

      const setAssignmentFeedbackListInfo = () => {
          db.collection("Courses")
              .doc("Computer Science")
              .collection("modules")
              .doc(props.input)
              .collection("Assignments").doc(selectedAssignment).collection("feedback")
              .get()
              .then((snapshot) => {
                  const feedback = [];
                  snapshot.forEach((doc) => {
                      const data = doc.data();
                      feedback.push(data);
                  });
                  console.log("Thiisss"+feedback[0].text)

                  setAssignmentFeedbackList(feedback)
              } )

              .catch((error) => console.log(error));
      }

      setAssignmentFeedbackListInfo()
      console.log("Help:"+AssignmentFeedbackList)

      console.log("looping?")




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
        <button onClick={getAssignmentFeedbackList}>Press me</button>


    </div>
  );
}
