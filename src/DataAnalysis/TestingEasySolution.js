import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import BarChart from "./BarChart";
import BarFormat from "./SimpleBarFormat";
import "./GraphElement.css";

/**
 * Created by: Harry Clifford
 *
 */

let labels = [
    { key: "Median", color: "#3700B3"},
    { key: "Mean", color: "#03DAC6"},
    { key: "UQ", color: "#FFC61A"},
    { key: "LQ", color: "#00E600"}
];

export default function TestingEasySolution(){
    const [Assignments, SetAssignments] = useState([]);
    const [Modules, SetModules] = useState([]);
    const [Data, SetData] = useState([]);
    const [BarGraph, SetGraph] = useState(<h3>Graph Loading</h3>);
    const modules = []
    const assignments = []
    useEffect(() => {
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
                    getAssignments()
                })
                .catch((error) => console.log(error));
        }

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
                                assignments.push({MarkList: data.MarkList, Title: data.Title, MaxMark: data.Marks})
                            }
                        });
                        SetAssignments(assignments)
                    });
            }

        }
        returnAssignments();
    }, []);

    useEffect (() => {
        function updateData(){
            SetData(BarFormat(Assignments))
            console.log(Data)
        }
        updateData()
    }, [Assignments, Modules])

    useEffect (() => {
        function updateGraph(){
            if (Data !== []) {
                console.log("Accessed")
                SetGraph(<BarChart key={Data.length}
                    data={Data}
                    labels={labels}/>)
            }
        }
        updateGraph()
    }, [Data])
    console.log(Assignments, "Assignments")
    console.log(Data, "Data")
    console.log(BarGraph, "BarGraph")

    return(
        <div>
            {BarGraph}
            {Data.map(data =>
                <div className="AssignmentList" key={data.Title}>
                    <h5> {data.Title} </h5>
                    <p>
                     Mark: {data.Mark}% Median: {data.Median}% Mean: {data.Mean}%
                    </p>
                </div>
            )}
        </div>
    )
}