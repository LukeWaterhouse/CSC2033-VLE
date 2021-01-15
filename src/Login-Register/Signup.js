import React, { useRef, useState, useEffect } from 'react'
import LoginComponent from './LoginComponent'
import firebase from '../firebase'

export default function Signup() {

    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passError, setPassError] = useState('')
    const [hasAccount, setHasAccount] = useState(false)

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }

    const clearErrors = () => {
        setEmailError('');
        setPassError('');
    }
    const handleLogin = () => {
        clearErrors();
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err => {
                switch(err.code){
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPassError(err.message);
                        break;
                }
            });
    };

    const handleSignup = () => {
        clearErrors()
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(err => {
                switch(err.code){
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPassError(err.message);
                        break;
                }
            });
    }

    const handleLogout = () => {
        firebase.auth.signOut();
    }
    const authListener = () => {
        firebase.auth.onAuthStateChanged(user => {
            if (user) {
                clearInputs()
                setUser(user);
            } else {
                setUser('');
            }
        })
    }

    useEffect(() => {
        authListener();
    }, [])

    function handleSubmit(e) {
        e.preventDefault()

    }

    return(
        <LoginComponent
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passError={passError}
        />
        )
}