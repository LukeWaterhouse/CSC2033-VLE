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
    clearErrors();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((pull) => {
        const usersId = firebase.auth().currentUser.uid;
        db.collection("UserDetails")
          .doc(usersId)
          .get()
          .then((doc) => {
            const adminCheck = doc.data().isAdmin;
            console.log("IsAdmin Check: ", adminCheck);
            console.log("UsersID: ", usersId);
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
    const emailInput = email;
    const usernameInput = username;
    clearErrors();

    let isAdminTrue = false;

    let adminKey = "";
    db.collection("Admin")
      .doc("AdminKey")
      .get()
      .then((doc) => {
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
    console.log("use effect start");
    authListener();
  }, []);

  const authListener = () => {
    console.log("auth listener");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);

        clearInputs();
      } else {
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
