import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

export class Confirm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const {
            values: { Title, Instructions, Marks, Module, Date_Due, Time_Due }
        } = this.props;
        return (
            <MuiThemeProvider>
                <>
                    <Dialog
                        open
                        fullWidth
                        maxWidth='md'
                    >
                        <AppBar title="Confirm User Data" />
                        <List>
                            <ListItem>
                                <ListItemText primary="Title" secondary={Title} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Instructions" secondary={Instructions} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Marks" secondary={Marks} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Module" secondary={Module} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Date Due" secondary={Date_Due} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Time Due" secondary={Time_Due} />
                            </ListItem>
                        </List>
                        <br />

                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={this.back}
                        >Back</Button>

                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.continue}
                        >Confirm & Continue</Button>
                    </Dialog>
                </>
            </MuiThemeProvider>
        );
    }
}

export default Confirm;