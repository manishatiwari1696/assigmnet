import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Header from "./components/header"
import { connect } from "react-redux";
import {
  FormBuilder,
  FieldGroup,
  FieldControl,
  Validators,
} from "react-reactive-form";
import { getlogginUserdetails, createNotes, editNotesApi, deleteNote } from "./actions/userAction"
import EditNotesPortal from "./components/editNotesPortal"


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openEditNotesPortal: false
    }
  }

  notesForm = FormBuilder.group({
  });

  handleSubmit = async (e) => {
    e.preventDefault()
    await this.props.dispatch(
      createNotes(this.notesForm.value)
    );
  }

  onEdit = (notesId, notesData) => {
    this.notesData = notesData
    this.editNoteId = notesId
    this.setState({
      openEditNotesPortal: true
    })
  }

  updateNotes = async (notesData) => {
    var result = await this.props.dispatch(
      editNotesApi(notesData, this.editNoteId)
    );
    if (result) {
      this.setState({
        openEditNotesPortal: false
      })
    }
  }

  deleteNotes = async (noteId) => {
    var result = await this.props.dispatch(
      deleteNote(noteId)
    );
  }

  openDecisionBox = (noteId) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.deleteNotes(noteId)
        },
        {
          label: 'No'
        }
      ]
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        {!this.props.userDetails ?
          <div className="main">
            <section className="container mt-5 mb-4">
              <div className="col-lg-9 m-auto">
                <FieldGroup
                  control={this.notesForm}
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
            <section className="">
              <div className="table-responsive-md">
                <table className="table table-striped table-bordered">
                  <thead className="thead-theme">
                    <tr>
                      <th>Title</th>
                      <th>Note</th>
                      <th>Category</th>
                      <th className="text-right">Created at </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.userNotes ? this.props.userNotes.map((data, index) => {
                      return (
                        <tr>
                          <td>{data.title}</td>
                          <td>{data.notes}</td>
                          <td>{data.category}</td>
                          <td className="text-right">{data.created_at}</td>
                          <td className="text-theme"><span style={{ cursor: "pointer" }} onClickCapture={() => this.onEdit(data.id, data)}>Edit</span>/<span style={{ cursor: "pointer" }} onClick={() => this.openDecisionBox(data.id)}>Delete</span></td>
                        </tr>
                      )
                    }) : null}
                    {this.state.openEditNotesPortal ?
                      <EditNotesPortal notesData={this.notesData} editFunction={this.updateNotes} /> : null}
                  </tbody>
                </table>
              </div>
            </section>
          </div> : <div style={{ textAlign: "center", marginTop: "15%" }}>Please login first to add your notes!</div>}
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    userDetails: state.user.loggedInUser,
    userNotes: state.user.userNotes
  };
}

export default connect(mapStateToProps)(App);
