import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import data from "./CurrentData";

export default function ButtonList() {
    const [Assignments, SetAssignments] = useState([]);
    const [Modules, SetModules] = useState([]);
    const [Output, SetOutput] = useState([]);

    const things = [];

    useEffect(() => {

        function returnAssignments() {
            db.collection("Courses")
                .doc("Computer Science")
                .collection("modules")
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        const data = doc.data();
                        things.push(data.Title);
                    });
                    SetModules(things);
                    getAssignments()
                })
                .catch((error) => console.log(error));
        }

        function getAssignments() {
            SetAssignments([]);
            for (let i = 0; i < things.length; i++) {
                db.collection("Courses")
                    .doc("Computer Science")
                    .collection("modules")
                    .doc(things[i])
                    .collection("Assignments")
                    .get()
                    .then((snapshot) => {
                        let AssignmentsToSet = [{Title: "Overall", Graph: "Bar", MarkLists: []}];
                        let MarkLists = []
                        snapshot.forEach((doc) => {
                            const data = doc.data();
                            if (data.Graded !== undefined) {
                                AssignmentsToSet.push({
                                    Title: data.Title,
                                    Module: data.Module,
                                    MarkList: data.MarkList,
                                    Graph: "Line",
                                });
                                MarkLists.push({MarkList: data.MarkList, Title: data.Title});
                            }
                        });
                        SetAssignments(Assignments => [...Assignments, AssignmentsToSet]);
                    });
            }
        }
        returnAssignments();
    }, []);
    useEffect(() => {
        function CombineData(){
            let objectArray = [];
            for (let i = 0; i < Modules.length; i++) {
                let tempObject = {};
                tempObject.Module = Modules[i];
                if (Assignments[i] !== undefined) {
                    let tempAssignments = Assignments[i].map((assignment) =>
                        <Dropdown.Item onClick={data.ButtonType(assignment)}>{assignment.Title}</Dropdown.Item>
                    );
                    tempObject.Assignments = tempAssignments;
                }
                objectArray.push(tempObject)
            }
            SetOutput(objectArray);

        }
        CombineData();
    });
    console.log(Assignments, Output)
    return(
        <div>
            {Output.map(object =>
                <DropdownButton title={object.Module} variant="secondary" as={ButtonGroup}>
                    {object.Assignments}
                </DropdownButton>
            )}
        </div>
    )
}

