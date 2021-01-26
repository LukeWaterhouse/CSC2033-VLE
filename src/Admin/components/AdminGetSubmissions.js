import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import firebase from "firebase";
import {db} from "../../firebase";
import {useCollectionData, useDocumentData} from "react-firebase-hooks/firestore";

const AdminGetSubmissions = (props) =>{
    console.log(props);
    const AssignRef = db.collection("Courses")
        .doc("Computer Science")
        .collection("modules")
        .doc(props.module)
        .collection("Assignments")
        .doc(props.input)
    const [ ass ] = useDocumentData(AssignRef);

    const SubRef = db.collection("Courses")
        .doc("Computer Science")
        .collection("modules")
        .doc(props.module)
        .collection("Assignments")
        .doc(props.input)
        .collection("Submissions")
    const query = SubRef.orderBy("SubmittedAt");
    const [submissions] = useCollectionData(query, {idField : "id"});

    return(
        <div>
            <ul>
            { submissions && submissions.map(submission => {
                return (
                    <div className="card-header border-white border-top text-md-center" style={{borderBlockColor:"#424242"}}>
                        <li>
                            <img src={submission.FileUrl} alt={submission.id} />
                        </li>
                    </div>
                );
            },)}
            </ul>
        </div>
    );

}
export default AdminGetSubmissions;