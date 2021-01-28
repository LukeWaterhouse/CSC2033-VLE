import React, { useEffect, useState } from "react";
import SignupComponent from "./SignupComponent";
import StudentHome from "../Student/pages/StudentHome";
import firebase, { db } from "../firebase";
import AdminHome from "../Admin/pages/AdminHome";

/**
 * Created by: Adam Marley
 * Handles all Signup, Sign In, and user details.
 * */

export default function Signup() {
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [adminPass, setAdminPass] = useState("");
  const [adminCheck, setAdminCheck] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setAdminPass("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPassError("");
  };

  const handleLogin = () => {
    //resets errors before starting.
    clearErrors();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((pull) => {
        //gets the current user id, and uses it as a key to retrieve the rest of the user's details.
        const usersId = firebase.auth().currentUser.uid;
        db.collection("UserDetails")
          .doc(usersId)
          .get()
          .then((doc) => {
            const adminCheck = doc.data().isAdmin;
            console.log("IsAdmin Check: ", adminCheck);
            console.log("UsersID: ", usersId);
            //sets the admin boolean here so the system knows which home screen to direct to.
            setAdminCheck(adminCheck);
          });
      })
      .catch((err) => {
        switch (err.code) {
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
    //reset errors before starting.
    const emailInput = email;
    const usernameInput = username;
    clearErrors();

    let isAdminTrue = false;

    let adminKey = "";
    db.collection("Admin")
      .doc("AdminKey")
      .get()
      .then((doc) => {
        //get the current admin key in use, and compare it to the user's input. if it matches up, sign the user up as an admin.
        adminKey = doc.data().currentKey.toString();

        if (adminPass === adminKey) {
          isAdminTrue = true;
          setAdminCheck(true);
        }

        console.log("Is Admin Check: ", isAdminTrue);
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((pull) => {
            //get the current user's id, and use it as the document path to store the rest of the user details in Firebase.
            const usersId = firebase.auth().currentUser.uid;

            console.log("Users ID", usersId);
            console.log("users Email", email);
            console.log("Username: ", username);

            db.collection("UserDetails")
              .doc(usersId)
              .set({
                username: usernameInput,
                email: emailInput,
                isAdmin: isAdminTrue,
              })
              .then(function () {})
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch((err) => {
            switch (err.code) {
              case "auth/email-already-in-use":
              case "auth/invalid-email":
                setEmailError(err.message);
                break;
              case "auth/weak-password":
                setPassError(err.message);
                break;
            }
          });
      });
  };

  useEffect(() => {
    //store the listener in the useEffect, so it can check for an authorisation state change every time a signin attempt is made.
    console.log("use effect start");
    authListener();
  }, []);

  const authListener = () => {
    console.log("auth listener");
    //if the user is successfully logged in, set user as the current firebase user object.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);

        clearInputs();
      } else {
      }
    });
  };

  //by default it shows the SignupComponent, aka the login screen. if the user exists and is an admin, go to AdminHome.
  //if the user exists and isn't an admin, go to StudentHome.
  return (
    <div className="AppLogin">
      {user && adminCheck === false ? (
        <StudentHome />
      ) : user && adminCheck === true ? (
        <AdminHome />
      ) : (
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
          username={username}
          setUsername={setUsername}
        />
      )}
    </div>
  );
}
