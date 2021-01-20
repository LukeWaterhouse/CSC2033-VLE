import React from 'react'
import { Link } from 'react-router-dom'
import {db} from "../../firebase";
import moment from "moment";
import {useCollectionData} from "react-firebase-hooks/firestore";


const AssignmentSummary = ({assignment}) =>{
    return (
        <div className="card z-depth-0">
            <div className="card-content text-black-50 text-darken-3">
                <span className="card-title ">{assignment.Title}</span>
                <p>Posted by Someone</p>
                <p className="text-black-50">{moment(assignment.createdAt.toDate()).calendar()}</p>
            </div>
        </div>
    )
}

function AssignmentList(props){
    const AssRef = db
        .collection("Courses")
        .doc("Computer Science")
        .collection("modules")
        .doc(props.input)
        .collection("Assignments");
    const query = AssRef.orderBy("createdAt");
    const [assignment] = useCollectionData(query, {idField : "id"})
    console.log(assignment);

    return (
        <div className="Assignments">
            { assignment && assignment.map(assignment => {
                return (
                    <Link to={'/AssignmentDetails/' + assignment.id} key={assignment.id}>
                        <AssignmentSummary assignment={assignment} />
                    </Link>
                )
            })}
        </div>
    )
}

export default AssignmentList;