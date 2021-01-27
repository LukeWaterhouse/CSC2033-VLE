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

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child('Modules/' + props.module
            + '/' + ass.Title + '/' + firebase.auth().currentUser.uid + '/' + file.name);
        await fileRef.put(file);
        setFileUrl(await fileRef.getDownloadURL());
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
            .set({
                id : firebase.auth().currentUser.uid,
                Filename : fileUrl,
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