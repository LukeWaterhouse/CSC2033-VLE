import React, { useState } from "react";
import { db } from "../../firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  TextField,
} from "@material-ui/core";
import { Button } from "react-bootstrap";
import Dialog from "@material-ui/core/Dialog";

/**
 * Created by: Giorgos Christodoulou
 * This file contains a function that fetches the submissions from the database and lists them as button.
 * When clicked, a dialog screen is displayed, with the submitted document and an input for a grade.
 * When the grade is submitted, it is updated in the database and it is added in the mark list for grads in the specific assignment.
 */

function AdminSubmissionDisplay(props) {
  //Checking the values in props are as desired.
  console.log(props);

  const [open, setOpen] = useState(false);
  const [Grade, setGrade] = useState(0);

  //Creates an Object list from the current assignments document data in the firebase.
  const AssRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("modules")
    .doc(props.props.module)
    .collection("Assignments")
    .doc(props.props.input);
  const [ass] = useDocumentData(AssRef);
  console.log([ass]);

  //
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
        //Updates the users grade and marks them as graded
        Grade: Grade,
        Graded: true,
      })
      .then(() => {
        alert("Student has been Graded!");
      })
      .catch((error) => {
        alert(error.message);
      });

    //Adds their mark to the Marklist.
    const MarkList = ass.MarkList;
    MarkList.push(Grade);

    db.collection("Courses")
      .doc("Computer Science")
      .collection("modules")
      .doc(props.props.module)
      .collection("Assignments")
      .doc(props.props.input)
      .update({
        //Replaces the old Mark list with the new one.
        MarkList: MarkList,
      })
      .then(() => {
        alert("Student Grade has been added ot the List");
      })
      .catch((error) => {
        alert(error.message);
      });

    setGrade(0);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    //Lists the submitters names as buttons.
    <div>
      <div
        className="card-header border-white border-top text-md-center"
        style={{ borderBlockColor: "#424242" }}
      >
        <a className="text-warning">
          <Button
            variant="secondary"
            onClick={handleClickOpen}
            style={{ background: "#424242" }}
          >
            {props.submission.Name}
          </Button>
        </a>
      </div>

      <Dialog
        open={open}
        onClose={handleClose} // When a button is clicked it opens a dialog box with a displayed submission.
        aria-labelledby="Grade"
        fullWidth
      >
        <DialogTitle id="Grade">
          <span style={{ color: "lightBlue" }}>Submit</span>
        </DialogTitle>
        <DialogContent>
          <object
            width="100%"
            height="400"
            data={props.submission.Filename}
            type="application/pdf"
          >
            {" "}
          </object>
          <br />
          <TextField
            placeholder="Grade"
            label="Grade"
            margin="Grade"
            variant="outlined"
            value={Grade}
            onChange={(e) => setGrade(e.target.value)}
            /* The admins inputted grade is stored in the event*/
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
