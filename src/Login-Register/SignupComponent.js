import React, {useEffect, useState} from 'react';
import firebase from "../firebase";

function SignupComponent(props) {

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
        setEmailError,
        passError,
        setPassError,
        accountDetails,
        adminPass,
        setAdminPass,
        username,
        setUsername,
        course,
        setCourse
    } = props;

    let [courseList, setCourseList] = useState([])

    useEffect(() => {
        const subjects = [];
        firebase.firestore().collection("Courses").get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    subjects.push(doc.data().Title)
                })
                courseList = subjects
                console.log("course list after setting it to subjects")
                console.log(courseList)
            })
    }, []);

    return(
        <section className="login">
            <div className="loginContainer">
                <label color="grey">Email</label>
                <input type="text" autoFocus required value={email} onChange={e => setEmail(e.target.value)}/>
                <p className="errorMsg">{emailError}</p>
            </div>
            <label>Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}/>
            <p className="errorMsg">{passError}</p>

            <div className="SignupContainer">
                {hasAccount ? (
                    <>
                        <button onClick={handleLogin}>Sign In</button>
                        <p>Don't have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                    </>
                ) : (
                    <>
                        <label>Admin</label>
                        <input type="text" onChange={e => setAdminPass(e.target.value)}/>
                        <p className="admin">If you require an admin account, enter the extra password given to you by your IT technician. Else ignore this input.</p>

                        <label>Username</label>
                        <input type="text" onChange={e => setUsername(e.target.value)}/>
                        <p/>

                        <label>Select your course:</label>
                        <input type="text" value="Computer Science" onChange={e => setCourse(e.target.value)}/>
                        <p/>

                        <button onClick={handleSignup}>Sign Up</button>
                        <p>Already have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                    </>
                )}
            </div>

        </section>
    )

}

export default SignupComponent;
