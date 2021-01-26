import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import Button from "react-bootstrap/Button";
import Dialog from "@material-ui/core/Dialog";
import {DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import firebase from "firebase";
import {useDocumentData} from "react-firebase-hooks/firestore";

function AssignmentSubmit(props){
    const [fileUrl, setFileUrl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const AssignRef = db.collection("Courses")
        .doc("Computer Science")
        .collection("modules")
        .doc(props.module)
        .collection("Assignments")
        .doc(props.input)
    const [ ass ] = useDocumentData(AssignRef);

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(fileUrl);

        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child('Modules/' + props.module
            + '/' + ass.Title + '/' + firebase.auth().currentUser.uid + '/' + fileUrl.name);
        fileRef.put(fileUrl).then((snapshot) => {
            console.log('Uploaded a file!');
            });
        setFileUrl(fileRef.getDownloadURL());

        db.collection("Courses")
            .doc("Computer Science")
            .collection("modules")
            .doc(props.module)
            .collection("Assignments")
            .doc(props.input)
            .collection("Submissions")
            .add({
                Id : firebase.auth().currentUser.uid,
                FilePath : fileUrl.fullPath,
                FileUrl : fileUrl,
                SubmittedAt : new Date(),
                Grade : 0,
                Graded : false,

            })
            .then(() => {
                alert("Successfully submitted!");
            })
            .catch((error) => {
                alert(error.message);
            });

        setFileUrl(null)
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
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
                        <br />
                        <h3 style={{color: 'lightBlue'}}> Submit a File</h3>
                        <TextField
                            style={{color: 'black'}}
                            type="file"
                            variant="outlined"
                            files={fileUrl}
                            onChange={(e) => setFileUrl(e.target.files[0])}
                        />
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