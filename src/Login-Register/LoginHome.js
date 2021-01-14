import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, BrowserRouter, Link, Route, Switch} from "react-router-dom";





class LoginHome extends React.Component {
    render() {
        return (
            <div>

                <h1>LOGIN SCREEN</h1>

                    <Link to="/StudentHome">Student Login</Link>
                    <br/>
                    <Link to="/AdminHome">Admin Login</Link>
                    <br/>
                    <Link to="/SignupPage">Don't have an account? Signup</Link>



            </div>



        );
    }
}

export default LoginHome


