
import React, { Component } from "react";
import { connect } from "react-redux";
import { logginUser, getlogginUserdetails, removeLoggedInUserData } from "../actions/userAction"
import RegistrationForm from "./registrationPopup"
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
} from "react-reactive-form";

import '../App.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openRegistrationForm: false
        }
    }

    loginForm = FormBuilder.group({
        username: ["", [Validators.required, Validators.email]],
        password: ["", Validators.required],
        rememberMe: false
    });

    async componentDidMount() {
        await this.props.dispatch(
            getlogginUserdetails()
        );
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        await logginUser(this.loginForm.value)
        await this.props.dispatch(
            getlogginUserdetails()
        );
    }

    logout = async () => {
        localStorage.removeItem("token");
        await this.props.dispatch(removeLoggedInUserData());
    }

    openRegistrationForm = () => {
        this.setState({
            openRegistrationForm: !this.state.openRegistrationForm
        })
    }

    render() {
        return (
            <div className="App">
                <header className="header">
                    <nav className="navbar navbar-dark bg-theme">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {!this.props.userDetails ? <div>
                            <FieldGroup
                                control={this.loginForm}
                                render={({ get, invalid }) => (
                                    <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>

                                        <FieldControl
                                            name="username"
                                            render={({ handler, touched, hasError }) => (
                                                <div>
                                                    <input
                                                        className="form-control-login mr-sm-2"
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
                                                <div>
                                                    <input
                                                        className="form-control-login mr-sm-2"
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
                                        <button
                                            type="submit"
                                            className="btn btn-theme rounded-0 text-white px-4 py-1"
                                            disabled={invalid}
                                        >
                                            Sign in
                    </button>
                                    </form>

                                )}
                            />     <div className="acount">
                                Don't have a account?
            <a onClick={this.openRegistrationForm} style={{ cursor: "pointer" }} className="text-white mx-2"><u> Sign up </u></a>
                            </div></div> : <button
                                onClick={this.logout}
                                className="btn btn-theme rounded-0 text-white px-4 py-1"
                            >
                                Logout
    </button>}

                        {this.state.openRegistrationForm ?
                            <RegistrationForm close={this.openRegistrationForm} /> : null}
                    </nav>
                </header>
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