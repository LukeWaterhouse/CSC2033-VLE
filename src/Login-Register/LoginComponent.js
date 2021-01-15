import React from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";

const login = (props) => {

    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        setEmailError
    } = props;

    return(
        <section className="login">
            <div className="loginContainer">
                <label>Username</label>
                <input type="text" autoFocus required value={email} onChange={e => setEmail(e.target.value)}/>
                <p className="errorMsg">{emailError}</p>
            </div>
        </section>
    )

}

export default login;