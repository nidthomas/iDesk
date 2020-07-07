import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import * as actions from "../actions/action_index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import NavItem from "./NavItem";
import { withRouter } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Modal from '@material-ui/core/Modal';
import loading from "../loading.gif";
import "./Security.css";
import errorLogo from "../error.ico";
import {FormLabel} from "@material-ui/core";


class Security extends Component {


  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      password: "",
      phone: "",
      email: "",
      location: "",
      buildingNo: "",
      idError: "",
      nameError: "",
      passwordError: "",
      phoneError: "",
      emailError: "",
      locationError:"",
      submitDisabled: true,
      success: false,
      failure: false,
      loading: false
    };
    this.isDisabled = this.isDisabled.bind(this);
    this.handleCloseSuccess = this.handleCloseSuccess.bind(this);
    this.handleCloseFailure = this.handleCloseFailure.bind(this);
  }

  changeValue(e, type) {
    const value = e.target.value;
    const nextState = {};
    nextState[type] = value;
    this.setState(nextState);
  }

  //For the pop up
  handleCloseSuccess() {
    this.setState({success: false});
    this.props.history.push("/security");
  }

  handleCloseFailure() {
    this.setState({failure: false});
  }

  isDisabled() {
    const {id, name, password, email, phone, location} = this.state;
    let isIdValid = false;
    let isNameValid = false;
    let isPasswordValid = false;
    let idRegex = /A-[0-9]{4}$/;
    let nameRegex = /^[a-zA-Z ]*$/;
    let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let phoneRegex = /[1-9][0-9]{9}$/;
    let isEmailValid = false;
    let isPhoneValid = false;
    let isLocationValid = false;

    if (id === "") {
      this.setState({idError: null});
    } else if (id.match(idRegex)) {
      isIdValid = true;
      this.setState({idError: null});
    } else {
      this.setState({idError: "Please enter a valid Employee ID"});
    }


    if (name === "") {
      this.setState({nameError: null});
    } else if (name.match(nameRegex)) {
      isNameValid = true;
      this.setState({nameError: null});
    } else {
      this.setState({nameError: "Please enter a valid Name"});
    }

    if (location === "") {
      this.setState({locationError: null});
    } else if (location.match(nameRegex)) {
      isLocationValid = true;
      this.setState({locationError: null});
    } else {
      this.setState({locationError: "Please enter a valid Location"});
    }

    if (email === "") {
      this.setState({emailError: null});
    } else if (email.match(emailRegex)) {
      isEmailValid = true;
      this.setState({emailError: null});
    } else {
      this.setState({emailError: "Please enter a valid Email"});
    }

    if (phone === "") {
      this.setState({phoneError: null});
    } else if (phone.match(phoneRegex) && phone.length === 10) {
      isPhoneValid = true;
      this.setState({phoneError: null});
    } else {
      this.setState({phoneError: "Please enter a valid Phone"});
    }



    if (password === "") {
      this.setState({passwordError: null});
    } else if (password.length >= 5 || password.indexOf(' ') === 0) {
      isPasswordValid = true;
      this.setState({passwordError: null});
    } else if (this.state.password.length < 5) {
      this.setState({passwordError: "Your password must be at least 5 characters"});
    } else {
      this.setState({passwordError: "Please enter a valid password"});
    }

    if (isIdValid && isNameValid && isPasswordValid && isEmailValid && isPhoneValid) {
      this.setState({submitDisabled: false});
    }
    if (!isIdValid || !isNameValid || !isPasswordValid || !isEmailValid || !isPhoneValid || !isLocationValid) {
      this.setState({submitDisabled: true});
    }

  }

  onSubmit = e => {
    e.preventDefault();

    const {id, name, password, email, phone, location, buildingNo} = this.state;
    this.setState({loading: true});
    axios.post("/securities", {id, name, password, email, phone, location, buildingNo}).then(result => {
      let data = result.data;
      this.setState({loading: false});
      if(data === "") {
        this.setState({failure: true});
      } else {
        this.setState({success: true});
      }
    });
  };

  render() {
    return (
        <section>
        <NavItem/>
        <div className="container" >
          <MuiThemeProvider>
            <div>
              <br/>
              <h3 style={{maxWidth: "100%"}}>Add Security User</h3>
              <form onSubmit={this.onSubmit}>
                <div className="inputFormBox">
                  <div className={"row"}>
                    <div className="col-sm-6 col-md-6">
                <TextField
                    style={{maxWidth: "100%"}}
                    errorText={this.state.idError}
                    hintText="Enter Security ID"
                    floatingLabelText="Security ID"
                    onChange={e => this.changeValue(e, 'id')}
                    onBlur={this.isDisabled}
                />
                    </div>
                    <div className="col-sm-6 col-md-6">
                <TextField
                    style={{maxWidth: "100%"}}
                    errorText={this.state.nameError}
                    hintText="Enter Security Name"
                    floatingLabelText="Security Name"
                    onChange={e => this.changeValue(e, 'name')}
                    onBlur={this.isDisabled}
                />
                </div>
                  </div>
                  <div className={"row"}>
                    <div className="col-sm-6 col-md-6">
                <TextField
                    style={{maxWidth: "100%"}}
                    type="password"
                    errorText={this.state.passwordError}
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    onChange={e => this.changeValue(e, 'password')}
                    onBlur={this.isDisabled}
                />
                </div>
                    <div className="col-sm-6 col-md-6">
                <TextField
                    style={{maxWidth: "100%"}}
                    errorText={this.state.emailError}
                    hintText="Enter your Email"
                    floatingLabelText="Email"
                    onChange={e => this.changeValue(e, 'email')}
                    onBlur={this.isDisabled}
                />
                    </div></div>
                  <div className={"row"}>
                    <div className="col-sm-6 col-md-6">
                <TextField
                    style={{maxWidth: "100%"}}
                    errorText={this.state.phoneError}
                    hintText="Enter your Phone"
                    floatingLabelText="Phone"
                    onChange={e => this.changeValue(e, 'phone')}
                    onBlur={this.isDisabled}
                />
                </div>
                    <div className="col-sm-6 col-md-6">
                <TextField
                    style={{maxWidth: "100%"}}
                    errorText={this.state.locationError}
                    hintText="Enter your Location"
                    floatingLabelText="Location"
                    onChange={e => this.changeValue(e, 'location')}
                    onBlur={this.isDisabled}
                />
                </div>
                  </div>
                  <div className={"row"}>
                    <div className="col-sm-6 col-md-6">
                <TextField
                    style={{maxWidth: "100%"}}
                    hintText="Enter your Building"
                    floatingLabelText="Building"
                    onChange={e => this.changeValue(e, 'buildingNo')}
                    onBlur={this.isDisabled}
                />
                    </div>
                  </div>
                </div>
                <RaisedButton style={{maxWidth: "100%"}} label="Add Security" type='submit' primary={true}
                              disabled={this.state.submitDisabled}/>
                <Dialog
                    open={this.state.success}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="dialog"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Security added successfully
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <RaisedButton onClick={this.handleCloseSuccess} primary={true} className="dialogButton" type='submit'>
                      OK
                    </RaisedButton>
                  </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.failure}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="dialog"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <img src={errorLogo} alt="error logo" style={{maxWidth:"100%"}} height={50}/>
                    <br/>
                      Employee ID already exists. Please try again
                      <br/>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <RaisedButton onClick={this.handleCloseFailure} primary={true} className="dialogButton" type='submit'>
                      OK
                    </RaisedButton>
                  </DialogActions>
                </Dialog>
              </form>
            </div>
          </MuiThemeProvider>
          <Modal open={this.state.loading} style={{backgroundColor: "rgba(255,255,255, 0.2)", maxWidth: "80%"}}>
            <div className="loadingSecurity"><img src={loading} alt="loading" height="100"/></div>
          </Modal>
        </div>
        </section>
    );
  }
}

export default withRouter(Security);