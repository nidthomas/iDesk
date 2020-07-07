import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import { withRouter } from 'react-router-dom'
import "./Login.css";
import logo from "../ibslogo.svg"
import errorLogo from "../error.ico"
import loading from "../loading.gif";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Modal from '@material-ui/core/Modal';

class Login extends Component {

  //Setting up the component states
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      usernameError: "",
      passwordError: "",
      submitDisabled: true,
      credentialError: false,
      loading: false
    };
    this.isDisabled = this.isDisabled.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  //To assign entered value to state variable
  changeValue(e, type) {
    const value = e.target.value;
    const nextState = {};
    nextState[type] = value;
    this.setState(nextState);
  }

  //For the pop up
  handleClose() {
    this.setState({credentialError: false});
  }

  //For validating username and password
  isDisabled() {
    const {username, password} = this.state;
    let isUsernameValid = false;
    let isPasswordValid = false;
    let usernameRegex = /A-[0-9]{4}$/i;

    if (username === "admin") {
      isUsernameValid = true;
      this.setState({usernameError: null});
    } else if (username === "") {
        this.setState({usernameError: null});
    } else if (username.match(usernameRegex)) {
        isUsernameValid = true;
        this.setState({usernameError: null});
    } else {
        this.setState({usernameError: "Please enter a valid Employee ID"});
    }

    if (password === "") {
      this.setState({passwordError: null});
    } else if (password.length >= 5 || password.indexOf(' ') === 0) {
        isPasswordValid = true;
        this.setState({passwordError: null});
    } else if(this.state.password.length < 5){
        this.setState({passwordError: "Your password must be at least 5 characters"});
    } else {
        this.setState({passwordError: "Please enter a valid password"});
    }
    if (isUsernameValid && isPasswordValid) {
      this.setState({submitDisabled: false});
    }
    if (!isUsernameValid || !isPasswordValid) {
      this.setState({submitDisabled: true});
    }

  }

  //Perform user authentication
  onSubmit = e => {
    e.preventDefault();

    const {username, password} = this.state;

    if (username === "admin" && password === "admin") {

      console.log("Admin is authenticated");
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("username", "admin");
      localStorage.setItem("role", "admin");
      this.props.history.push("/");

    } else {
      this.setState({loading: true});
      let empId = username.toUpperCase();
      axios.post("/login", {empId, password}).then(result => {
        this.setState({loading: false});
        if (result.data === true) {
          console.log("User is authenticated");
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("username", empId);
          localStorage.setItem("role", "security");
          this.props.history.push("/");
        } else {
          this.setState({credentialError: true});
        }
      });

    }
  };

  render() {
      if(localStorage.getItem("isAuthenticated") !== null) {
          return   <Redirect to={{
              pathname: '/'}
          } />
      } else {
          return (
              <div className="container">
                  <MuiThemeProvider>
                      <div className="login">
                          <img src={logo} alt="logo" style={{maxWidth: "100%"}}/>
                          <br/>
                          <form onSubmit={this.onSubmit}>
                              <br/>
                              <TextField
                                  style={{maxWidth: "100%"}}
                                  errorText={this.state.usernameError}
                                  hintText="Enter your Employee ID"
                                  floatingLabelText="Employee ID"
                                  onChange={e => this.changeValue(e, 'username')}
                                  onBlur={this.isDisabled}
                              />
                              <br/>
                              <TextField
                                  style={{maxWidth: "100%"}}
                                  type="password"
                                  errorText={this.state.passwordError}
                                  hintText="Enter your Password"
                                  floatingLabelText="Password"
                                  onChange={e => this.changeValue(e, 'password')}
                                  onBlur={this.isDisabled}
                              />
                              <br/>
                              <br/>
                              <RaisedButton style={{maxWidth: "100%"}} label="Sign In" type='submit' primary={true}
                                            disabled={this.state.submitDisabled}/>
                              <Dialog
                                  open={this.state.credentialError}
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description"
                                  className="dialog"
                              >
                                  <DialogContent>
                                      <DialogContentText id="alert-dialog-description">
                                          <img src={errorLogo} alt="error logo" style={{maxWidth: "100%"}} height={50}/>
                                          <br/>
                                          Invalid Credentials. Please try again
                                          <br/>
                                      </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                      <RaisedButton onClick={this.handleClose} primary={true} className="dialogButton"
                                                    type='submit'>
                                          OK
                                      </RaisedButton>
                                  </DialogActions>
                              </Dialog>
                          </form>
                      </div>
                  </MuiThemeProvider>
                  <Modal open={this.state.loading} style={{backgroundColor: "rgba(255,255,255, 0.2)"}}>
                      <div className="loadingLogin"><img src={loading} alt="loading" height="100"/></div>
                  </Modal>
              </div>
          );
      }
  }
}

export default withRouter(Login);
