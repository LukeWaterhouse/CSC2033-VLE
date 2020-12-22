import React from 'react'
import StudentNavBar from "../NavBar/StudentNavBar";
import cssFiles from "../css-files/disccusionBoard.css"


class StudentFAQ extends React.Component {

    render() {
        return (
            <div>
                <StudentNavBar/>
                <h2>FAQ</h2>
                <div className="panel panel-default post-editor">
                    <div className="panel-body">
                        Hello World

                    </div>
                </div>
            </div>
        );
    }
}

export default StudentFAQ
