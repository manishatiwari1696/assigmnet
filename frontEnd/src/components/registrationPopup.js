
import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Modal from 'react-modal';
import { registerUser } from "../actions/userAction"
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
} from "react-reactive-form";

import '../App.css';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openRegistrationForm: false
        }
    }

    registrationForm = FormBuilder.group({
        email: ["", [Validators.required, Validators.email]],
        password: ["", Validators.required],
        username: ["", Validators.required]
    });



    handleSubmit = async (e) => {
        e.preventDefault()
        let result = await registerUser(this.registrationForm.value)
        if (result) {
            this.props.close()
        }
    }


    render() {
        return (
            <div className="App">
                <button onClick={this.openModal}>Open Modal</button>
                <Modal
                    isOpen={true}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2> Registration Form <span style={{ marginLeft: "60%", cursor: "pointer" }} onClick={this.props.close}>X</span></h2>
                    <section className="container mt-5 mb-4">
                        <div className="col-lg-9 m-auto">
                            <FieldGroup
                                control={this.registrationForm}
                                render={({ get, invalid }) => (
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="row">
                                            <FieldControl
                                                name="username"
                                                render={({ handler, touched, hasError }) => (
                                                    <div className="col-md-6 form-group">
                                                        <input
                                                            className="form-control rounded-0 border-top-0 border-right-0 border-left-0 px-0"
                                                            type="text"
                                                            placeholder="Name"
                                                            {...handler()}
                                                        />
                                                        <span>
                                                            {touched
                                                                && ((hasError("required")
                                                                    && `Password is required`) || (hasError("email") &&
                                                                        "Please enter a valid email"))}
                                                        </span>
                                                    </div>
                                                )}
                                            />

                                            <FieldControl
                                                name="email"
                                                render={({ handler, touched, hasError }) => (
                                                    <div className="col-md-6 form-group">
                                                        <input
                                                            className="form-control rounded-0 border-top-0 border-right-0 border-left-0 px-0"
                                                            type="email"
                                                            placeholder="Email"
                                                            {...handler()}
                                                        />
                                                        <span>
                                                            {touched
                                                                && ((hasError("required")
                                                                    && `Password is required`) || (hasError("email") &&
                                                                        "Please enter a valid email"))}
                                                        </span>
                                                    </div>
                                                )}
                                            />

                                            <FieldControl
                                                name="password"
                                                render={({ handler, touched, hasError }) => (
                                                    <div className="col-md-12 form-group">
                                                        <input
                                                            className="form-control rounded-0 border-top-0 border-right-0 border-left-0 px-0"
                                                            type="password"
                                                            placeholder="Password"
                                                            {...handler()}
                                                        />
                                                        <span>
                                                            {touched
                                                                && hasError("required")
                                                                && `Password is required`}
                                                        </span>
                                                    </div>
                                                )}
                                            />
                                            <div className="col-md-12 text-right">
                                                <button
                                                    type="submit"
                                                    className="btn btn-theme rounded-0 px-4 text-white"
                                                    disabled={invalid}
                                                >
                                                    Submit
                                                    </button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            />
                        </div>
                    </section>
                </Modal>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        userDetails: state.user.loggedInUser
    };
}

export default connect(mapStateToProps)(Header);