import React from "react";
import { Link, Route, Switch } from "react-router-dom";

class LoginHome extends React.Component {
  render() {
    return (
      <div>
        <h1>LOGIN SCREEN</h1>

        <Link to="/Signup">Student Login</Link>
        <br />
      </div>
    );
  }
}

export default LoginHome;
