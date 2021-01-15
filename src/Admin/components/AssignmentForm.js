import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {DialogActions, DialogContent, DialogTitle, FormControl, makeStyles} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";

function AssignmentForm() {

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    const [Title, setTitle] = useState("");
    const [Instructions, setInst] = useState("");
    const [Marks, setMarks] = useState("");
    const [Module, setModule] = useState("");
    const [Deadline, setDate] = useState("");
    const [AssignmentList, setAssignmentList] = useState([]);


    useEffect(() => {
        console.log("useEffect Ran");
        db.collection("Courses").doc("Computer Science").collection("modules")
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

        db.collection("Courses").doc("Computer Science").collection("modules").doc(Module.toString()).collection("Assignments")
            .add({
                Title : Title,
                Instructions : Instructions,
                Marks : Marks,
                Module : Module,
                Deadline : Deadline,
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
        setDate("")
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
                            <FormControl variant="filled" className={classes.formControl}>
                            <select
                                value={Module}
                                onChange={(e) => setModule(e.currentTarget.value)}
                            >

                                {AssignmentList &&
                                AssignmentList.map((module) => (
                                    <option key={module.Title} value={module.Title}>
                                        {module.Title}
                                    </option>
                                ))}
                            </select>
                            </FormControl>
                        </div>
                            <TextField
                                label="Deadline"
                                type="datetime-local"
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={Deadline}
                                onChange={(e) => setDate(e.target.value)}
                            />
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