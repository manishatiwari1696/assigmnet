
import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Modal from 'react-modal';
import { editNotes } from "../actions/userAction"
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

    editNotesForm = FormBuilder.group({});

    componentDidMount() {
        this.editNotesForm.patchValue({
            title: this.props.notesData.title,
            category: this.props.notesData.category,
            notes: this.props.notesData.notes
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        this.props.editFunction(this.editNotesForm.value)
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
                                control={this.editNotesForm}
                                render={({ get, invalid }) => (
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="row">
                                            <FieldControl
                                                name="title"
                                                render={({ handler, touched, hasError }) => (
                                                    <div className="col-md-6 form-group">
                                                        <input
                                                            className="form-control rounded-0 border-top-0 border-right-0 border-left-0 px-0"
                                                            type="text"
                                                            placeholder="Name"
                                                            {...handler()}
                                                        />
                                                    </div>
                                                )}
                                            />

                                            <FieldControl
                                                name="category"
                                                render={({ handler, touched, hasError }) => (
                                                    <div className="col-md-6 form-group">
                                                        <select
                                                            className="form-control rounded-0 border-top-0 border-right-0 border-left-0 px-0"
                                                            id="exampleFormControlSelect1"
                                                            {...handler()}
                                                        >
                                                            <option value="">Select Category</option>
                                                            <option value={1}>1</option>
                                                            <option value={2}>2</option>
                                                            <option value={3}>3</option>
                                                            <option value={3}>4</option>
                                                            <option value={4}>5</option>
                                                        </select>
                                                    </div>
                                                )}
                                            />

                                            <FieldControl
                                                name="notes"
                                                render={({ handler, touched, hasError }) => (
                                                    <div className="col-md-12 form-group">
                                                        <input
                                                            className="form-control rounded-0 border-top-0 border-right-0 border-left-0 px-0"
                                                            type="text"
                                                            placeholder="Type your notes here.."
                                                            {...handler()}
                                                        />
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