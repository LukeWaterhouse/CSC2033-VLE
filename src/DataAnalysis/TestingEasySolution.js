import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import BarChart from "./BarChart";
import BarFormat from "./SimpleBarFormat";
import "./GraphElement.css";
import firebase from "firebase";

/**
 * Created by: Harry Clifford
 * Displays a graph and list of assignments to be displayed on the webpage
 */

let labels = [
  { key: "Median", color: "#260080" },
  { key: "Mean", color: "#03DAC6" },
  { key: "UQ", color: "#EBAF4C" },
  { key: "LQ", color: "#00E600" },
];

// Outputs the graph and assignment list for the results pages
export default function TestingEasySolution() {
  // Set's default use state's and data logging for firebase
  const [Assignments, SetAssignments] = useState([]);
  const [Modules, SetModules] = useState([]);
  const [Data, SetData] = useState([]);
  const [BarGraph, SetGraph] = useState(<h3>Graph Loading</h3>);
  const [Role, SetRole] = useState(false);

  const modules = [];
  const assignments = [];

  let userid = "";

  //first checks if there is an authState change before retrieving the current users details
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      getUserID().then((r) => {
        db.collection("UserDetails")
          .doc(userid)
          .get()
          .then((doc) => {
            const role = doc.data().isAdmin;
            SetRole(role);
            console.log(role);
          });
      });
    } else {
      console.log("DATABASE ERROR");
    }
  });

  async function getUserID() {
    userid = firebase.auth().currentUser.uid;
    console.log("ID:", userid);
  }

  useEffect(() => {
    // Sets modules to have a list of all modules
    function returnAssignments() {
      db.collection("Courses")
        .doc("Computer Science")
        .collection("modules")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();
            modules.push(data.Title);
          });
          SetModules(modules);
          getAssignments();
        })
        .catch((error) => console.log(error));
    }
    // Set's up the assignments to have mark details to be used by SimpleBarFormat and the AssignmentList
    function getAssignments() {
      SetAssignments([]);
      for (let i = 0; i < modules.length; i++) {
        db.collection("Courses")
          .doc("Computer Science")
          .collection("modules")
          .doc(modules[i])
          .collection("Assignments")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              const data = doc.data();
              if (data.Marked === true) {
                assignments.push({
                  MarkList: data.MarkList,
                  Title: data.Title,
                  MaxMark: data.Marks,
                  Module: modules[i],
                  Mark: "0",
                  Role: Role,
                });
              }
            });
            console.log(assignments);
            getMarks(assignments);
          });
      }
    }
    function getMarks(markAssignments) {
      console.log(markAssignments, Assignments);
      for (let i = 0; i < markAssignments.length; i++) {
        db.collection("Courses")
          .doc("Computer Science")
          .collection("modules")
          .doc(markAssignments[i].Module)
          .collection("Assignments")
          .doc(markAssignments[i].Title)
          .collection("Submissions")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              const data = doc.data();
              if (data.id === userid) {
                markAssignments[i].Mark = data.Grade;
              }
            });
            SetAssignments(markAssignments);
          });
      }
    }
    returnAssignments();
  }, []);
  // Update the data to be used by the graph as the list of modules and assignments changes
  useEffect(() => {
    function updateData() {
      console.log(Assignments);
      SetData(BarFormat(Assignments));
    }
    updateData();
  }, [Assignments, Modules]);
  // Updates the graph everytime the data to be displayed within changes
  useEffect(() => {
    function updateGraph() {
      console.log(Assignments);
      if (Data !== []) {
        SetGraph(<BarChart key={Data.length} data={Data} labels={labels} />);
      }
    }
    updateGraph();
  }, [Data]);
  // Returns the graph along with a list of assignments
  return (
    <div>
      {BarGraph}
      {Data.map((data) => (
        <div className="AssignmentList">
          <h5> {data.Title} </h5>
          <p key={data.Title}>
            Mark: {data.Mark}% Median: {data.Median}% Mean: {data.Mean}%
          </p>
        </div>
      ))}
    </div>
  );
}
