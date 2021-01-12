import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {DialogActions, DialogContent, DialogTitle} from "@material-ui/core";

function AssignmentForm() {

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
                <DialogTitle id="Create Assignment">Create Assignment</DialogTitle>
                    <DialogContent>
                        <TextField
                            placeholder="Title"
                            label="Title"
                            margin="small"
                            variant="outlined"
                        />
                        <br />
                        <TextField
                            placeholder="Give Out instructions"
                            label="Instructions"
                            margin="normal"
                            multiline
                            rows={50}
                            variant="outlined"
                        />
                        <br />
                        <TextField
                            placeholder="Please Specify Number Of Marks"
                            label="Marks"
                            margin="normal"
                            variant="outlined"
                        />
                        <br />
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

                            />
                            <TextField
                                placeholder="hh:mm"
                                label="Time Due"
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                 </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleClose} color="primary">
                                Complete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
        );

}

export default AssignmentForm;