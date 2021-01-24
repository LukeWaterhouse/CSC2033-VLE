import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import {db} from "../../firebase";
import {useDocumentData} from "react-firebase-hooks/firestore";
import Card from 'react-bootstrap/Card'

const AssignmentDetailsPage = (props) => {
    console.log(props);
    const AssignRef = db.collection("Courses")
        .doc("Computer Science")
        .collection("modules")
        .doc(props.module)
        .collection("Assignments")
        .doc(props.input)
    const [ ass ] = useDocumentData(AssignRef);
    console.log(ass);

    if (ass) {
        return (
            <div>
                <div className="card-header border-white border-top">
                    <div>
                        <Card bg={'Info'.toLowerCase()}
                              text={'Info'.toLowerCase() === 'light' ? 'dark' : 'white'}
                              >

                        <Card.Body>
                            <Card.Text>
                                <h4>{ass.Title}</h4>
                                <br/>
                                <p>{ass.Instructions}</p>
                                <p>Module: {ass.Module}</p>
                                <p>Marks: {ass.Marks}</p>
                                <p>Deadline: {moment(ass.Deadline.toDate()).calendar()}</p>
                                <div className="text-black-50">Posted by Someone</div>
                                <div className="text-black-50">{moment(ass.createdAt.toDate()).calendar()}</div>
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading project...</p>
            </div>
        )
    }
}

export default AssignmentDetailsPage;