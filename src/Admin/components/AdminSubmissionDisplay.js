import React, {useState} from 'react'
import moment from 'moment'
import firebase from "firebase";
import {db} from "../../firebase";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {DialogActions, DialogContent, DialogTitle, Link, TextField} from "@material-ui/core";
import {Button} from "react-bootstrap";
import Dialog from "@material-ui/core/Dialog";


function AdminSubmissionDisplay(props){

    console.log(props);

    const [open, setOpen] = useState(false);
    const [Grade, setGrade] = useState(0);

    const AssRef =
        db.collection("Courses")
            .doc("Computer Science")
            .collection("modules")
            .doc(props.props.module)
            .collection("Assignments")
            .doc(props.props.input)
    const [ ass ] = useDocumentData(AssRef)
    console.log([ass])

    const onDone = (e) => {
        e.preventDefault();

        db.collection("Courses")
            .doc("Computer Science")
            .collection("modules")
            .doc(props.props.module)
            .collection("Assignments")
            .doc(props.props.input)
            .collection("Submissions")
            .doc(props.submission.id)
            .update({
                Grade : Grade,
                Graded : true,
            })
            .then(() => {
                alert("Student has been Graded!");
            })
            .catch((error) => {
                alert(error.message);
            });

        const MarkList = ass.MarkList.add(Grade)

        db.collection("Courses")
            .doc("Computer Science")
            .collection("modules")
            .doc(props.props.module)
            .collection("Assignments")
            .doc(props.props.input)
            .update({
                MarkList : MarkList,
            }).then(() => {
            alert("Student Grade has been added ot the List");
            })
            .catch((error) => {
                alert(error.message);
            });

        setGrade(0)
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return(
        <div>
            <div
                className="card-header border-white border-top text-md-center"
                style={{ borderBlockColor: "#424242" }}
            >
                <a className="text-warning">
                    <Button variant="secondary" onClick={handleClickOpen} style={{ background: "#424242" }}>
                        {props.key}
                    </Button>
                </a>
            </div>

            <Dialog open={open} onClose={handleClose}
                    aria-labelledby="Grade" fullWidth>
                <DialogTitle id="Grade"><span style={{color: 'lightBlue'}}>Submit</span></DialogTitle>
                <DialogContent>
                    <object width="100%" height="400" data= {props.submission.Filename} type="application/pdf"> </object>
                    <br/>
                    <TextField
                        placeholder="Grade"
                        label="Grade"
                        margin="Grade"
                        variant="outlined"
                        value={Grade}
                        onChange={(e) => setGrade(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="info">
                        Cancel
                    </Button>
                    <Button onClick={onDone} variant="info">
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </div>


    );

}


export default AdminSubmissionDisplay;