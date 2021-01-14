import React, { useRef, useState, useEffect } from 'react'
import{ Form, Button, Card, Container } from 'react-bootstrap'
import firebase from 'firebase'

export default function Signup() {

    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmer] = useState('')
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
        firebase.auth.onAuthStateChanged(user)
        if(user){
            clearInputs()
            setUser(user);
        } else {
            setUser('');
        }
    }

    useEffect(() => {
        authListener();
    }, [])

    function handleSubmit(e) {
        e.preventDefault()

    }

    return(
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", minWidth: "200vh" }}>
                <Card>
                    <Card.Body>
                        <div className="w-100" style={{ maxWidth: "500px" }}></div>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        <Form>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef}required></Form.Control>
                            </Form.Group>

                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef}required></Form.Control>
                            </Form.Group>

                            <Form.Group id="password-confirm">
                                <Form.Label>Password Confirm</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef}required></Form.Control>
                            </Form.Group>
                            <Button type="submit" className="w-100">Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        )
}