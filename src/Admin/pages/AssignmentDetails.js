import React from "react";
import { Link } from "react-router-dom";
import AdminNavBar from "../NavBar/AdminNavBar";
import AssignmentDetailsPage from "../components/AssignmentDetailsPage";
import Button from "react-bootstrap/Button";
import AdminGetSubmissions from "../components/AdminGetSubmissions";
import FinishedGrading from "../components/FinishedGrading";

/**
 * Created by: Giorgos Christodoulou
 * Displays the selected assignments details in a card.
 * Displays the submissions for the selected assignment.
 * Displays a button that, when pressed changes the assignment from pending to finished.
 */

export default class AssignmentDetails extends React.Component {
    render() {
        //Takes the props from the url after the /, to pass them on.
        console.log(this.props);
        console.log(this.props.match.params);
        const input = this.props.match.params.details;
        const module = this.props.match.params.module;
        return (
            //Creates a button to return to original page.
            //Shows the assignment details as a card, followed by a list of the submissions.
            <div>
                <AdminNavBar />
                <div style={{paddingLeft:"20px",paddingTop:"30px"}}>
                    <Link to="/AdminAssignments">
                        <Button variant="secondary" style={{backgroundColor:"#1A1A1B"}}>
                            Back to Assignment page
                        </Button>
                    </Link>
                </div>
                <h1>Assignment Details</h1>
                <AssignmentDetailsPage input={input} module={module}/>
                <br/>
                <h1>Submissions</h1>
                <AdminGetSubmissions input={input} module={module}/>
                <br/>
                <FinishedGrading input={input} module={module}/>
            </div>
        );
    }
}