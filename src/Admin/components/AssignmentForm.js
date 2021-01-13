import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";

function AssignmentForm() {

    const [Title, setTitle] = useState("");
    const [Instructions, setInst] = useState("");
    const [Marks, setMarks] = useState("");
    const [Course, setCourse] = useState([]);
    const [Module, setModule] = useState([]);
    const [Due_Date, setDate] = useState("");
    const [Due_Time, setTime] = useState("");

    const handleComplete = (e) => {
        e.preventDefault();

        db.collection("Assignments")
            .add({
                Title : Title,
                Instructions : Instructions,
                Marks : Marks,
                Course : Course,
                Module : Module,
                Due_Date : Due_Date,
                Due_Time : Due_Time,
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
        setCourse("")
        setModule("")
        setDate("")
        setTime("")
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
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Create Assignment</Button>
            <Dialog open={open} onClose={handleClose}
                aria-labelledby="Create Assignment">
                <DialogTitle id="Create Assignment"><span style={{color: 'mediumpurple'}}>Create Assignment</span></DialogTitle>
                    <DialogContent>
                        <form>
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
                        <br />
                        <select>

                        </select>

                        <TextField
                            placeholder="Module Name"
                            label="Module"
                            margin="normal"
                            variant="outlined"
                        />
                        <br />
                        <div>
                            <TextField
                                placeholder="dd/mm/yy"
                                label="Due Date"
                                margin="normal"
                                variant="outlined"
                                value={Due_Date}
                                onChange={(e) => setDate(e.target.value)}

                            />
                            <TextField
                                placeholder="hh:mm"
                                label="Time Due"
                                margin="normal"
                                variant="outlined"
                                value={Due_Time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>
                        </form>
                 </DialogContent>
                    <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleComplete} color="primary">
                                Complete
                            </Button>
                        </DialogActions>
            </Dialog>
        </div>
    );

}

export default AssignmentForm;