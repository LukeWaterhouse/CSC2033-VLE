import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class AssignmentForm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };


    render() {
        const { values, handleChange } = this.props;
        return (
            <MuiThemeProvider>
                <>
                    <Dialog
                        open
                        fullWidth
                        maxWidth='lg'
                    >
                        <AppBar title="Create An Assignment" />
                        <h1>Create an assignment.</h1>
                        Click continue once you've entered everything.
                        <br />
                        <TextField
                            placeholder="Title"
                            label="Title"
                            onChange={handleChange('Title')}
                            defaultValue={values.Title}
                            margin="small"
                            variant="outlined"
                        />
                        <br />
                        <TextField
                            placeholder="Give Out instructions"
                            label="Instructions"
                            onChange={handleChange('Instructions')}
                            defaultValue={values.Instructions}
                            margin="normal"
                            multiline
                            rows={50}
                            variant="outlined"
                        />
                        <br />
                        <TextField
                            placeholder="Please Specify Number Of Marks"
                            label="Marks"
                            onChange={handleChange('Marks')}
                            defaultValue={values.Marks}
                            margin="normal"
                            variant="outlined"
                        />
                        <br />
                        <TextField
                            placeholder="Module Name"
                            label="Module"
                            onChange={handleChange('Module')}
                            defaultValue={values.Module}
                            margin="normal"
                            variant="outlined"
                        />
                        <br />
                        <div>
                            <TextField
                                placeholder="dd/mm/yy"
                                label="Due Date"
                                onChange={handleChange('Date_Due')}
                                defaultValue={values.Date_Due}
                                margin="normal"
                                variant="outlined"

                            />
                            <TextField
                                placeholder="hh:mm"
                                label="Time Due"
                                onChange={handleChange('Time_Due')}
                                defaultValue={values.Time_Due}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <br />
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.continue}
                        >Continue</Button>
                    </Dialog>
                </>
            </MuiThemeProvider>
        );
    }
}

export default AssignmentForm;