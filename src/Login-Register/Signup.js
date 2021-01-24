import React, {useEffect, useState} from 'react'
import SignupComponent from './SignupComponent'
import StudentHome from '../Student/pages/StudentHome'
import firebase, {db} from '../firebase'
import AdminHome from "../Admin/pages/AdminHome";

export default function Signup() {


    const [user, setUser] = useState()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
        db.collection("UserDetails").doc(firebase.auth().currentUser.uid).get()
            .then(doc => {
                if(doc.data().isAdmin === true){
                    setIsAdmin(true)
                }
            })
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

        db.collection("UserDetails").doc(firebase.auth().currentUser.uid).set({
            course:course,
            email:email,
            isAdmin:isAdmin,
        }).then(function() {
            console.log("user info added to database.");
        }).catch(function(error) {
            console.log(error)
        })

        console.log(firebase.auth().currentUser)
        console.log("signup ended")
    }

    function verifyAdmin() {
        let adminKey = "";
        db.collection("Admin").doc("AdminKey").get()
            .then(doc => {
                adminKey = doc.data().currentKey
                console.log(adminKey)
            })

        if (adminPass === adminKey){
            setIsAdmin(true)
        }
    }

    useEffect(() => {
        console.log("use effect start")
        console.log("does this ever fire")
        authListener()
    }, []);

    const authListener = () => {
        firebase.auth().onAuthStateChanged((user ) => {
            console.log(user);
            if (user) {
                setUser(firebase.auth().currentUser)
                console.log("setting user")
                clearInputs();
            } else {
                console.log("user not set")
            }
        });
    }


    return(
        <div className="AppLogin">
            {(user && isAdmin) ? (<AdminHome/>) : ((user && !isAdmin) ? (<StudentHome/>) :
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
            courseList={courseList}
            setCourseList={setCourseList}
        />)}
        </div>
    )
}
