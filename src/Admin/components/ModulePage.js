import React, { Component } from "react";
import {db} from "../../firebase";
import DeleteModule from "./deleteModule";
import {useCollectionData} from "react-firebase-hooks/firestore";


function AssignmentShow({assignmentGet}){
    const tempDoc = []
    const AssignmentRef = db.collection("Courses")
        .doc("Computer Science")
        .collection("modules").doc(assignmentGet).collection("Assignments");

    //const [Assignments] = useCollectionData(AssignmentRef, { idField: "Title"});
    AssignmentRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                tempDoc.push(doc.data().Instructions)
            })
        })

    return (
        <div>
            {console.log(tempDoc)}
            <ul>
                {tempDoc.map((assignment) => (
                    <li>{assignment}</li>
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
                <DeleteModule thisId={this.props.moduleName}/>
            </div>
        );
    }
}

export default  ModulePage;