import React, { useEffect, useState } from "react";
import SignupComponent from "./SignupComponent";
import StudentHome from "../Student/pages/StudentHome";
import firebase, { db } from "../firebase";
import AdminHome from "../Admin/pages/AdminHome";

export default function Signup() {
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminCheck, setAdminCheck] = useState(false)


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
    console.log("handle login start");
    clearErrors();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password).then(pull => {
      const usersId = firebase.auth().currentUser.uid;
      db.collection("UserDetails").doc(usersId).get().then(doc => {
        const adminCheck = doc.data().isAdmin
        console.log("admin check please: ",adminCheck)
        setAdminCheck(adminCheck)
      })
      console.log("can we get this: ",user.uid)
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
    console.log("login end");
  };

  const handleSignup = () => {


    const emailInput = email;
    const usernameInput = username;
    console.log("handle signup start");
    clearErrors();

    let isAdminTrue = false;

    let adminKey = "";
    db.collection("Admin")
      .doc("AdminKey")
      .get()
      .then((doc) => {
        adminKey = doc.data().currentKey.toString();
        console.log("this is admin key: " + adminKey);
        console.log("this is the admin Pass: " + adminPass);
        console.log("compare adminpass and adminkey", adminPass === adminKey);

        if (adminPass === adminKey) {
          isAdminTrue = true;
          setAdminCheck(true)
        }

        console.log("isAdmin in signup: ", isAdminTrue);
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((pull) => {
            const usersId = firebase.auth().currentUser.uid;

            console.log("this:::", usersId);
            console.log(email);
            console.log(username);

            db.collection("UserDetails")
              .doc(usersId)
              .set({
                username: usernameInput,
                email: emailInput,
                isAdmin: isAdminTrue,
              })
              .then(function () {
                console.log("user info added to database.");
              })
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

        console.log(firebase.auth().currentUser);
        console.log("signup ended");
      });
  };

  useEffect(() => {
    console.log("use effect start");
    authListener();
  }, []);

  const authListener = () => {
    console.log("auth listener");
    firebase.auth().onAuthStateChanged((user) => {
      console.log("user: ", user);
      if (user) {
        setUser(user);
        console.log("this things: ", user.uid);
        console.log("setting user");
        clearInputs()
      } else {
        console.log("user not set");
      }
    });
  };

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
