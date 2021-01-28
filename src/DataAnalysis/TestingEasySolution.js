import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import BarChart from "./BarChart";
import BarFormat from "./SimpleBarFormat";
import "./GraphElement.css";

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
  const modules = [];
  const assignments = [];

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
              if (data.Graded === true) {
                assignments.push({
                  MarkList: data.MarkList,
                  Title: data.Title,
                  MaxMark: data.Marks,
                  Module: data.Module,
                });
              }
            });
            SetAssignments(assignments);
          });
      }
    }
    returnAssignments();
  }, []);
  // Update the data to be used by the graph as the list of modules and assignments changes
  useEffect(() => {
    function updateData() {
      SetData(BarFormat(Assignments));
    }
    updateData();
  }, [Assignments, Modules]);
  // Updates the graph everytime the data to be displayed within changes
  useEffect(() => {
    function updateGraph() {
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
        <div className="AssignmentList" key={data.Title}>
          <h5> {data.Title} </h5>
          <p>
            Mark: {data.Mark}% Median: {data.Median}% Mean: {data.Mean}%
          </p>
        </div>
      ))}
    </div>
  );
}
