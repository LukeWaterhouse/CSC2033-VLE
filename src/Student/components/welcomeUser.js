import React, { useState } from "react";
import { db } from "../../firebase";
import firebase from "firebase";
import Card from "react-bootstrap/Card";

/**
 * Created by: Luke Waterhouse
 * This file contains functionality to display a welcome message for the currently logged in user
 */

//pulls the username and sets it to state
export default function Welcome() {
  const [userName, setUsername] = useState("");

  let userID = "";

  //first checks if there is an authState change before retrieving the current users details
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      getUserID().then((r) => {
        db.collection("UserDetails")
          .doc(userID)
          .get()
          .then((doc) => {
            const username = doc.data().username;
            setUsername(username);
          });
      });
    } else {
      console.log("DATABASE ERROR");
    }
  });

  async function getUserID() {
    userID = firebase.auth().currentUser.uid;
    console.log("ID:", userID);
  }

  return (
    <div>
      <Card style={{ background: "#424242" }}>
        <h3 style={{ color: "white" }}>Welcome {userName}!</h3>
      </Card>
    </div>
  );
}
