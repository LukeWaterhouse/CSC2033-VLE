import React, { useEffect } from "react";
import { db } from "../../firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import AdminSubmissionDisplay from "./AdminSubmissionDisplay";

/**
 * Created by: Giorgos Christodoulou
 * This file contains a component which fetches the user submissions from the firebase submissions collection,
 * and loops through them to display each one in a list.
 */

const AdminGetSubmissions = (props) => {
  //Checking the values in props are as desired.
  console.log(props);

  const [subs, setSubs] = React.useState([]);

  //Creates an Object list from the current assignments document data in the firebase
  const AssignRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("modules")
    .doc(props.module)
    .collection("Assignments")
    .doc(props.input);
  const [ass] = useDocumentData(AssignRef);

  //Creates a mapped list of all the submissions for an assignment.
  useEffect(() => {
    const fetchsubs = async () => {
      //Gets a reference for the collection
      const SubRef = await db
        .collection("Courses")
        .doc("Computer Science")
        .collection("modules")
        .doc(props.module)
        .collection("Assignments")
        .doc(props.input)
        .collection("Submissions")
        .get();
      //Adds all the submissions in a list.
      setSubs(
        SubRef.docs.map((doc) => {
          return doc.data();
        })
      );
    };
    fetchsubs();
  }, []);

  return (
    <div>
      <ul>
        {subs.map((submission) => {
          //Displays the submissions.
          return (
            <div>
              <li>
                <AdminSubmissionDisplay
                  key={submission.id}
                  submission={submission}
                  props={props}
                />
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminGetSubmissions;
