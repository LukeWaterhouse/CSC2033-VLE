import React, {useEffect, useState} from 'react'
import SignupComponent from './SignupComponent'
import StudentHome from '../Student/pages/StudentHome'
import firebase, {db} from '../firebase'
import AdminHome from "../Admin/pages/AdminHome";

export default function Signup() {


    const [user, setUser] = useState()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [course, setCourse] = useState('')
    const [courseList, setCourseList] = useState([])
    const [emailError, setEmailError] = useState('')
    const [passError, setPassError] = useState('')
    const [hasAccount, setHasAccount] = useState(false)
    const [adminPass, setAdminPass] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const clearInputs = () => {
        setEmail('');
        setPassword('');
        setUsername('')
        setAdminPass('')
    }

    const clearErrors = () => {
        setEmailError('');
        setPassError('');
    }

    const handleLogin = () => {
        console.log("handle login start")
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
        console.log("login end")
    };

    const handleSignup = () => {
        console.log("handle signup start")
        clearErrors()
        verifyAdmin()
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
            })

        console.log(firebase.auth().currentUser)
        console.log("signup ended")
    }

    const verifyAdmin = () => {
        let adminKey = "";
        db.collection("Admin").doc("AdminKey").get()
            .then(doc => {
                adminKey = doc.data().currentKey.toString()
            })
        console.log(adminPass)
        console.log(adminKey)
        console.log(adminPass === adminKey)
        console.log("this passes true for.... some reason")

        if (adminPass === adminKey){
            setIsAdmin(true)
        }
    }

    const addUserDetails = (user) => {
        db.collection("UserDetails").doc(user.uid).set({
            course:course,
            username:username,
            email:email,
            isAdmin:isAdmin,
        }).then(function() {
            console.log("user info added to database.");
        }).catch(function(error) {
            console.log(error)
        })
    }

    useEffect(() => {
        console.log("use effect start")
        authListener()
    }, []);

    const authListener = () => {
        firebase.auth().onAuthStateChanged(user  => {
            console.log(user);
            if (user) {
                setUser(user)
                addUserDetails(user)
                console.log(user)
                console.log("setting user")
                clearInputs();
            } else {
                console.log("user not set")
            }
        });
    }


    return(
        <div className="AppLogin">
            {user && isAdmin===false ? (<StudentHome/>) : (user && isAdmin===true ? (<AdminHome/>) : (
                <SignupComponent
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    handleSignup={handleSignup}
                    hasAccount={hasAccount}
                    setHasAccount={setHasAccount}
                    emailError={emailError}
                    setEmailError={setEmailError}
                    passError={passError}
                    setPassError={setPassError}
                    adminPass={adminPass}
                    setAdminPass={setAdminPass}
                    course={course}
                    setCourse={setCourse}
                    username={username}
                    setUsername={setUsername}
                    courseList={courseList}
                    setCourseList={setCourseList}
                />))}
        </div>
    )
}
