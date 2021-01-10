import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

export class Success extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        return (
            <MuiThemeProvider>
                <>
                    <Dialog
                        open
                        fullWidth
                        maxWidth='md'
                    >
                        <AppBar title="Success" />
                        <h1>Assignment has been created.</h1>
                        <p>The assignment has been created successfully.</p>

                        <br />
                        <Link to="/AdminAssignments">Back</Link>
                    </Dialog>
                </>
            </MuiThemeProvider>
        );
    }
}

export default Success;