import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import BarFormat from "./BarDataFormatting";
import Format from "./CumulativeDataFormatting";
import CumulativeFrequency from "./CumulativeFrequency";
import BarChart from "../BarChart";

/**
 * Created by: Harry Clifford
 * This file creates a list of buttons with module names for titles and a drop down with the options of clicking
 * overall or the name of a specific module to produce a graph based on that data (data parsed in dataformatting files)
 */

// Set labels for interactive legend on graphs
let labels = [
  { key: "Median", color: "#3700B3" },
  { key: "Mean", color: "#03DAC6" },
  { key: "UQ", color: "#FFC61A" },
  { key: "LQ", color: "#00E600" },
];

let cumulativeLabels = [
  { key: "Median", color: "#3700B3" },
  { key: "UQ", color: "#FFC61A" },
  { key: "LQ", color: "#00E600" },
];

// Set a default for graph when it isn't yet loaded
let Graph = <h3>Graph not Loaded</h3>;

// Creates a button list with interactivity to change a graph produced along side it based on marked assignments
export default function ButtonList() {
  const [Assignments, SetAssignments] = useState([]);
  const [Modules, SetModules] = useState([]);
  const [Output, SetOutput] = useState([]);

  const modules = [];

  useEffect(() => {
    // Creates list of modules
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
    // Creates data for each Graded assignment and overall's for each module
    // to be used in the onClick functions of the buttons
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
            let MarkLists = [];
            let AssignmentsToSet = [
              {
                Title: "Overall",
                Graph: "Bar",
                Module: modules[i],
                MarkLists: [],
              },
            ];
            snapshot.forEach((doc) => {
              const data = doc.data();
              if (data.Graded === true) {
                AssignmentsToSet.push({
                  Title: data.Title,
                  Module: data.Module,
                  MarkList: data.MarkList,
                  Graph: "Line",
                  MaxMark: data.Marks,
                });
                MarkLists.push({ MarkList: data.MarkList, Title: data.Title });
              }
            });
            AssignmentsToSet[0].MarkLists = MarkLists;
            SetAssignments((Assignments) => [...Assignments, AssignmentsToSet]);
          });
      }
      overall(Assignments);
    }

    returnAssignments();
  }, []);
  useEffect(() => {
    // Creates data to display buttons using data provided from getAssignments to the useState variable Assignments
    function CombineData() {
      let objectArray = [];
      for (let i = 0; i < Modules.length; i++) {
        let tempObject = {};
        tempObject.Module = Modules[i];
        if (Assignments[i] !== undefined) {
          let tempAssignments = Assignments[i].map((assignment) => (
            <Dropdown.Item
              key={assignment.Module + assignment.Title}
              onClick={updateGraph(assignment)}
            >
              {assignment.Title}
            </Dropdown.Item>
          ));
          tempObject.Assignments = tempAssignments;
        }
        objectArray.push(tempObject);
      }
      SetOutput(objectArray);
    }

    CombineData();
  }, [Assignments, Modules]);
  // Updates the graph based on the button clicked with the new data and if applicable new graph type
  function updateGraph(data) {
    if (data === undefined) {
      return;
    }
    if (data.Graph === "Line") {
      let tempGraph = Format(data);
      Graph = (
        <CumulativeFrequency
          key={tempGraph.length}
          data={tempGraph}
          labels={cumulativeLabels}
        />
      );
    } else if (data.Graph === "Bar") {
      let tempGraph = BarFormat(data);
      Graph = (
        <BarChart key={tempGraph.length} data={tempGraph} labels={labels} />
      );
    } else {
      Graph = <h3>No Graph Available</h3>;
    }
  }
  // Produces the data for all done assignments combined for use in a barchart
  function overall(data) {
    if (data === undefined) {
      return;
    }
    let outputData = { Graph: "Bar", Title: "Overall", MarkLists: [] };
    let MarkLists = [];
    for (let i = 0; i < data.length; i++) {
      for (let x = 1; x < data[i].length; x++) {
        MarkLists.push({
          MarkList: data[i][x].MarkList,
          Title: data[i][x].Title,
          MaxMark: data[i][x].MaxMark,
        });
      }
    }
    if (MarkLists === []) {
      updateGraph({ Graph: "NA" });
      return;
    }
    outputData.MarkLists = MarkLists;
    updateGraph(outputData);
    return;
  }

  overall(Assignments);
  // Returns the button list to be rendered along with the graph
  return (
    <div>
      <Button variant="secondary" onClick={overall(Assignments)}>
        {" "}
        Overall{" "}
      </Button>
      {Output.map((object) => (
        <DropdownButton
          title={object.Module}
          variant="secondary"
          as={ButtonGroup}
        >
          {object.Assignments}
        </DropdownButton>
      ))}
      {Graph}
    </div>
  );
}
