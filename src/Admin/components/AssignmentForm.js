import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import {DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { db,auth } from "../../firebase";
import Button from 'react-bootstrap/Button';
import {Form} from "react-bootstrap";
import firebase from "firebase";

let userName = "placeholder"
let isAdmin = false

function AssignmentForm() {


    useEffect(() => {//Get the user id of the current logged in user to find their name and admin status.

        db.collection("UserDetails").doc(firebase.auth().currentUser.uid).get().then(doc =>{

                userName = doc.data().username
                isAdmin = doc.data().isAdmin

            }
        )
    })

    const [Title, setTitle] = useState("");
    const [Instructions, setInst] = useState("");
    const [Marks, setMarks] = useState("");
    const [Module, setModule] = useState("");
    const [Deadline, setDate] = useState(new Date());
    const [AssignmentList, setAssignmentList] = useState([]);

    useEffect(() => {//Creates an array of all the modules, to be used for the drop down box.
        console.log("useEffect Ran");
        db.collection("Courses")
            .doc("Computer Science")
            .collection("modules")
            .get()
            .then((snapshot) => {
                const Assignments = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    Assignments.push(data);
                });
                setAssignmentList(Assignments);
                setModule(Assignments[0].Title.toString());
                console.log(Assignments)
            })
            .catch((error) => console.log(error));
    }, []);

    const handleComplete = (e) => { // Add an assignment with the values gathered from the form.
        e.preventDefault();

        db.collection("Courses")
            .doc("Computer Science")
            .collection("modules")
            .doc(Module.toString())
            .collection("Assignments")
            .add({
                Title : Title,
                Instructions : Instructions,
                Marks : Marks,
                Module : Module,
                createdBy : userName,
                Deadline :  new Date(Deadline), //Creates a timestamp of the deadline.
                createdAt : new Date(), //Creates a timestamp of the current date.
                Marked : false,
                MarkList : [],
            })
            .then(() => { //If its added successfully it displays this alert.
                alert("Successfully created assignment!");
            })
            .catch((error) => {
                alert(error.message);
            });

        //Reset all values.
        setTitle("")
        setInst("")
        setMarks("")
        setDate(new Date())

        setOpen(false);
    };

    const [open, setOpen] = React.useState(false);

    //Opens a dialog box.
    const handleClickOpen = () => {
        setOpen(true);
    };

    //Closes a dialog box.
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div className="mb-2">
                <Button variant="info" size="lg" onClick={handleClickOpen}>
                    Create Assignment
                </Button>
            </div>
            <Dialog open={open} onClose={handleClose}
                aria-labelledby="Create Assignment" fullWidth>
                <DialogTitle id="Create Assignment"><span style={{color: 'lightBlue'}}>Create Assignment</span></DialogTitle>
                    <DialogContent>
                        <Form>
                        <TextField
                            placeholder="Title"
                            label="Title"
                            margin="small"
                            variant="outlined"
                            validations={["required"]}
                            value={Title}
                            onChange={(e) => setTitle(e.target.value)} //Set the title to the input value.
                        />
                        <br />
                        <TextField
                            placeholder="Give Out instructions"
                            label="Instructions"
                            value={Instructions}
                            onChange={(e) => setInst(e.target.value)} //Set the instructions to the input value.
                            margin="normal"
                            multiline
                            validations={["required"]}
                            fullWidth
                            rows={50}
                            variant="outlined"
                        />
                        <br />
                        <TextField
                            placeholder="Specify Mark Amount"
                            label="Marks"
                            margin="normal"
                            validations={["required"]}
                            variant="outlined"
                            value={Marks}
                            onChange={(e) => setMarks(e.target.value)} //Set the marks to the input value.
                        />
                        <div>
                            <Form.Control   as="select"
                                            className="my-1 mr-sm-2"
                                            custom
                                            value={Module} //Set the module as the one selected.
                                            onChange={(e) => setModule(e.currentTarget.value)}>

                                {AssignmentList &&
                                AssignmentList.map((module) => (
                                    <option key={module.Title} value={module.Title}>
                                        {module.Title}
                                    </option>
                                ))}
                            </Form.Control>
                        </div>
                            <TextField
                                label="Deadline"
                                type="datetime-local"
                                returnFormat="moment"
                                validations={["required"]}
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={Deadline} //Set the deadline value as the input.
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Form>
                 </DialogContent>
                    <DialogActions>
                            <Button onClick={handleClose} variant="info">
                                Cancel
                            </Button>
                            <Button onClick={handleComplete} variant="info">
                                Complete
                            </Button>
                        </DialogActions>
            </Dialog>
        </div>
    );

}

export default AssignmentForm;