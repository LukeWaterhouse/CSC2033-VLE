import React from 'react'
import StudentNavBar from "../NavBar/StudentNavBar";
import DiscussionBoard from "../components/DiscussionBoard";
import {Link} from "react-router-dom";

export default class StudentDiscussionBoard extends React.Component{

    render() {

        console.log(this.props)
        console.log(this.props.match.params)
        const input = this.props.match.params.thread
        return (
            <div>
                <StudentNavBar/>
                <Link to="/StudentThreads">Back to Threads</Link>
                <DiscussionBoard input={input}/>
            </div>
        )
    }
}

