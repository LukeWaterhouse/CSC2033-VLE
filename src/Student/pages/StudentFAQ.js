import React from 'react'
import StudentNavBar from "../NavBar/StudentNavBar";
import cssFiles from "../css-files/disccusionBoard.css"
import 'bootstrap/dist/css/bootstrap.css'
import 'popper.js'
global.jQuery = require('jquery');
require('bootstrap');





class StudentFAQ extends React.Component {



    render() {
        return (
            <div>
                <StudentNavBar/>
                <h2>FAQ</h2>

                <div className="card card-body post-editor">
                    <div className="panel-body">
                        <textarea className="form-control post-editor-input" />
                        <button className="btn btn-success post-editor-button">Post</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentFAQ
