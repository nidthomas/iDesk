import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as actions from "../actions/action_index";
import { connect } from "react-redux";
import NavItem from "./NavItem";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import errorLogo from "../error.ico";
import Modal from "@material-ui/core/Modal";
import loading from "../loading.gif";

function mapStateToProps(state) {
  return {
    contact: state.contact,
    imageUrl: state.imageUrl
  };
}

class EditContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: {},
      selectedFile: null
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8081/employee/" + this.props.match.params.id).then(response => {
      this.props.showContact({
        contact: response.data
      });
    });
  }

  onChange = (field, value) => {
    let currentContact = { ...this.props.contact };

    this.props.changeContact({
      contact: currentContact,
      field: field,
      value: value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const {  employeeId, firstName, lastName, address, phone,email,role,laptopId, department, employeeImage } = this.props.contact;

    axios.put("http://localhost:8081/employee/" + this.props.contact.id, {employeeId, firstName, lastName, address, phone,email,role,laptopId, department, employeeImage}).then(result => {
      this.props.clearContact();
      this.props.history.push("/" );
    });
  };

  render() {
    return (
      <section>
        <NavItem/>
        <div className="container">
          <MuiThemeProvider>
            <div >
              <br/>
              <h3 style={{maxWidth: "100%"}}>Edit Employee</h3>
              <form onSubmit={this.onSubmit}>
                <div className="inputFormBox">
                  <div className={"row"}>
                    <div className="col-sm-6 col-md-6">
                      <TextField
                          style={{maxWidth: "100%"}}
                          errorText={this.state.idError}
                          floatingLabelText="Employee ID"
                          value={this.props.contact.employeeId}
                          onChange={e => this.onChange( 'employeeId',e.target.value)}
                          onBlur={this.isDisabled}
                      />
                    </div>
                    <div className="col-sm-6 col-md-6">
                      <TextField
                          style={{maxWidth: "100%"}}
                          errorText={this.state.firstNameError}
                          value={this.props.contact.firstName}
                          onChange={e => this.onChange( 'firstName',e.target.value)}
                          floatingLabelText="First Name"
                          onBlur={this.isDisabled}
                      />
                    </div>
                  </div>
                  <div className={"row"}>
                    <div className="col-sm-6 col-md-6">
                      <TextField
                          style={{maxWidth: "100%"}}
                          errorText={this.state.lastNameError}
                          value={this.props.contact.lastName}
                          onChange={e => this.onChange( 'lastName',e.target.value)}
                          floatingLabelText="Last Name"
                          onBlur={this.isDisabled}
                      />
                    </div>
                    <div className="col-sm-6 col-md-6">
                      <TextField
                          style={{maxWidth: "100%"}}
                          value={this.props.contact.address}
                          onChange={e => this.onChange( 'address',e.target.value)}
                          floatingLabelText="Address"
                          onBlur={this.isDisabled}
                      />
                    </div>
                  </div>
                  <div className={"row"}>
                    <div className="col-sm-6 col-md-6">
                      <TextField
                          style={{maxWidth: "100%"}}
                          errorText={this.state.emailError}
                          value={this.props.contact.email}
                          onChange={e => this.onChange( 'email',e.target.value)}
                          floatingLabelText="Email"
                          onBlur={this.isDisabled}
                      />
                    </div>

                    <div className="col-sm-6 col-md-6">
                      <TextField
                          style={{maxWidth: "100%"}}
                          errorText={this.state.phoneError}
                          value={this.props.contact.phone}
                          onChange={e => this.onChange( 'phone',e.target.value)}
                          floatingLabelText="Phone"
                          onBlur={this.isDisabled}
                      />
                    </div>
                  </div>
                  <div className={"row"}>
                    <div className="col-sm-6 col-md-6">
                      <TextField
                          style={{maxWidth: "100%"}}
                          errorText={this.state.departmentError}
                          value={this.props.contact.department}
                          onChange={e => this.onChange( 'department',e.target.value)}
                          floatingLabelText="Department"
                          onBlur={this.isDisabled}
                      />
                    </div>

                    <div className="col-sm-6 col-md-6">
                      <TextField
                          style={{maxWidth: "100%"}}
                          errorText={this.state.laptopError}
                          value={this.props.contact.laptopId}
                          onChange={e => this.onChange( 'laptopId',e.target.value)}
                          floatingLabelText="Laptop Id"
                          onBlur={this.isDisabled}
                      />
                    </div>
                  </div>
                </div>
                <br></br>
                <div className={"row"}>
                  <div className="col-sm-12 col-md-12">
                    <RaisedButton style={{maxWidth: "100%"}} label="Update Employee" type='submit' primary={true}
                                  disabled={this.state.submitDisabled}/>
                  </div>
                </div>
                <Dialog
                    open={this.state.success}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="dialog"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Employee updated successfully!!
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <RaisedButton onClick={this.handleCloseSuccess} primary={true} className="dialogButton" type='submit'>
                      OK
                    </RaisedButton>
                  </DialogActions>
                </Dialog>
              </form>
            </div>
          </MuiThemeProvider>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

const Edit = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditContact);
export default Edit;
