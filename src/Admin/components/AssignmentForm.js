import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import {DialogActions, DialogContent, DialogTitle, FormControl, makeStyles} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import Button from 'react-bootstrap/Button';
import {Form} from "react-bootstrap";

function AssignmentForm() {

    const [Title, setTitle] = useState("");
    const [Instructions, setInst] = useState("");
    const [Marks, setMarks] = useState("");
    const [Module, setModule] = useState("");
    const [Deadline, setDate] = useState(new Date());
    const [AssignmentList, setAssignmentList] = useState([]);

    useEffect(() => {
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

    const handleComplete = (e) => {
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
                Deadline :  new Date(Deadline),
                createdAt : new Date(),
                Graded : false,
                MedianLQ : 0,
                MedianUQ : 0,
            })
            .then(() => {
                alert("Successfully created assignment!");
            })
            .catch((error) => {
                alert(error.message);
            });

        setTitle("")
        setInst("")
        setMarks("")
        setDate(new Date())

        setOpen(false);
    };

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
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
                            value={Title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <br />
                        <TextField
                            placeholder="Give Out instructions"
                            label="Instructions"
                            value={Instructions}
                            onChange={(e) => setInst(e.target.value)}
                            margin="normal"
                            multiline
                            fullWidth
                            rows={50}
                            variant="outlined"
                        />
                        <br />
                        <TextField
                            placeholder="Specify Mark Amount"
                            label="Marks"
                            margin="normal"
                            variant="outlined"
                            value={Marks}
                            onChange={(e) => setMarks(e.target.value)}
                        />
                        <div>
                            <Form.Control   as="select"
                                            className="my-1 mr-sm-2"
                                            custom
                                            value={Module}
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
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={Deadline}
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