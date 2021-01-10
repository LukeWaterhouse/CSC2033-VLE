import React, { Component } from 'react';
import FormUserDetails from './AssignmentForm';
import Confirm from './Confirm';
import Success from './Success';

export class AssForm extends Component {
    state = {
        step: 1,
        Title: '',
        Instructions: '',
        Marks: '',
        Module: '',
        Date_Due: '',
        Time_Due: ''
    };



    // Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    };

    // Go back to prev step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };

    // Handle fields change
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };

    render() {
        const { step } = this.state;
        const { Title, Instructions, Marks, Module, Date_Due, Time_Due } = this.state;
        const values = { Title, Instructions, Marks, Module, Date_Due, Time_Due };

        switch (step) {
            case 1:
                return (
                    <FormUserDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 2:
                return (
                    <Confirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        values={values}
                    />
                );
            case 3:
                return <Success />;
        }
    }
}

export default AssForm;