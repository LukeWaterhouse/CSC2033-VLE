import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import Button from "react-bootstrap/Button";
import Dialog from "@material-ui/core/Dialog";
import {DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import firebase from "firebase";
import {useDocumentData} from "react-firebase-hooks/firestore";

/**
 * Created by: Giorgos Christodoulou
 * This file contains a function that allows the user to uplaod a file into the cloud storage
 * as a submission to the previously selected assignment.
 */


let userName = "placeholder"
let isAdmin = false

function AssignmentSubmit(props){

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

    const [fileUrl, setFileUrl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    //Creates an Object list using the document data of the current assignment.
    const AssignRef = db.collection("Courses")
        .doc("Computer Science")
        .collection("modules")
        .doc(props.module)
        .collection("Assignments")
        .doc(props.input)
    const [ ass ] = useDocumentData(AssignRef);

    const onFileChange = async (e) => { //Gets File from event state and stores it in the firebase storage.
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child('Modules/' + props.module
            + '/' + ass.Title + '/' + firebase.auth().currentUser.uid + '/' + file.name);
        await fileRef.put(file);
        setFileUrl(await fileRef.getDownloadURL()); //Creates a download Url for the file.
    };

    const onSubmit = (e) => {
        e.preventDefault();

        db.collection("Courses")
            .doc("Computer Science")
            .collection("modules")
            .doc(props.module)
            .collection("Assignments")
            .doc(props.input)
            .collection("Submissions")
            .doc(firebase.auth().currentUser.uid)
            //Current user id is the unique id for their submission in the Submission collection.
            .set({
                id : firebase.auth().currentUser.uid,
                Name : userName,
                Filename : fileUrl, //Stores file download url for future download.
                Grade : 0,
                Graded : false,

            })
            .then(() => {
                alert("Successfully submitted!");
            })
            .catch((error) => {
                alert(error.message);
            });

        //Reset values.

        setFileUrl(null)
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return ( //Displays a dialog box with a file input.
        <>
        <div>
            <div className="mb-2">
                <Button variant="info" size="lg" onClick={handleClickOpen}>
                    Submit Assignment
                </Button>
            </div>
            <Dialog open={open} onClose={handleClose}
                    aria-labelledby="Submit" fullWidth>
                <DialogTitle id="Submit"><span style={{color: 'lightBlue'}}>Submit</span></DialogTitle>
                <DialogContent>
                    <form onSubmit={onSubmit}>
                        <input
                            style={{color: 'black'}}
                            type="file"
                            onChange={onFileChange}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="info">
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} variant="info">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        </>
    );

}
export default AssignmentSubmit;