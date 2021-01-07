import React from "react";
import { Link, Route, Switch } from "react-router-dom";

class LoginHome extends React.Component {
  render() {
    return (
      <div>
        <h1>LOGIN SCREEN</h1>

        <Link to="/StudentHome">Student Login</Link>
        <br />
        <Link to="/AdminHome">Admin Login</Link>
      </div>
    );
  }
}

export default LoginHome;
