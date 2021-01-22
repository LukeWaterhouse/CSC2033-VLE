import React, { Component } from "react";
import {db} from "../../firebase";
import {useCollectionData} from "react-firebase-hooks/firestore";


function AssignmentShow({assignmentGet}){
    const tempDoc = []
    const AssignmentRef = db.collection("Courses")
        .doc("Computer Science")
        .collection("modules").doc(assignmentGet).collection("Assignments");

    AssignmentRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                tempDoc.push(doc.data())
            })
        })

    console.log(tempDoc);
    return (
        <div>
            <h1>Load</h1>
            <ul>
                {tempDoc.map(assignment => (
                    <li>{assignment.Title}</li>
                ))}
            </ul>
        </div>
    );
}


class ModulePage extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.moduleName}</h2>
                <AssignmentShow assignmentGet={this.props.moduleName}/>
            </div>
        );
    }
}

export default  ModulePage;