import React, {useEffect} from 'react'
import moment from 'moment'
import firebase from "firebase";
import {db} from "../../firebase";
import {useCollectionData, useDocumentData} from "react-firebase-hooks/firestore";
import {Link} from "@material-ui/core";
import { Document } from 'react-pdf'
import AdminSubmissionDisplay from "./AdminSubmissionDisplay";


const AdminGetSubmissions = (props) =>{
    console.log(props);

    const [users, setUsers] = React.useState([]);

    const AssignRef = db.collection("Courses")
        .doc("Computer Science")
        .collection("modules")
        .doc(props.module)
        .collection("Assignments")
        .doc(props.input)
    const [ ass ] = useDocumentData(AssignRef);

    useEffect(() => { const fetchusers = async () => {
        const SubRef = await db.collection("Courses")
            .doc("Computer Science")
            .collection("modules")
            .doc(props.module)
            .collection("Assignments")
            .doc(props.input)
            .collection("Submissions").get();
        setUsers(
            SubRef.docs.map((doc) => {
                return doc.data();
            })
        );
    }; fetchusers();
    },[]);


        return(
            <div>
                <ul>
                { users.map(submission => {
                    return(
                        <div>
                            <li key={submission.id}>
                                <AdminSubmissionDisplay key={submission.id} submission={submission} props={props}/>
                            </li>
                        </div>
                    )
                })}
                </ul>
            </div>
        );

}


export default AdminGetSubmissions;