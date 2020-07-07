import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import * as actions from "../actions/action_index";
import { bindActionCreators } from "redux";
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
    contact: state.contact
  };
}

class CreateContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employeeId: "",
      isFirstNameValid:"",
      isLastNameValid:"",
      isAddressValid:"",
      isLaptopValid:"",
      firstName: "",
      lastName:"",
      phone: "",
      email: "",
      address: "",
      laptopId:"",
      idError: "",
      firstNameError: "",
      lastNameError: "",
      addressNameError: "",
      isDepartmentValid:"",
      departmentError:"",
      department:"",
      phoneError: "",
      emailError: "",
      laptopError:"",
      submitDisabled: true,
      success: false,
      failure: false,
      loading: false
    };
    this.isEdit = false;
    if(props.employee!==undefined && props.employee!==null){
      this.isEdit = true;
      this.state.firstName=props.employee.firstName;
      this.state.lastName=props.employee.lastName;
      this.state.employeeId=props.employee.employeeId;
      this.state.phone=props.employee.phone;
      this.state.email=props.employee.email;
      this.state.address=props.employee.address;
      this.state.laptopId=props.employee.laptopId;
      this.state.department=props.employee.department;
    }
    this.isDisabled = this.isDisabled.bind(this);
    this.handleCloseSuccess = this.handleCloseSuccess.bind(this);
    this.handleCloseFailure = this.handleCloseFailure.bind(this);
  }

  //For the pop up
  handleCloseSuccess() {
    this.setState({success: false});
    this.props.handleClose();
   // this.props.history.push("/security");
  }

  handleCloseFailure() {
    this.setState({failure: false});
  }

  componentDidMount() {
    this.props.clearContact();
  }

  onChange = (field, value) => {
    let currentContact = { ...this.props.contact };

    this.props.changeContact({
      contact: currentContact,
      field: field,
      value: value
    });
  };

  changeValue(e, type) {
    const value = e.target.value;
    const nextState = {};
    nextState[type] = value;
    this.setState(nextState);
  }

  isDisabled() {
    const {employeeId, firstName, lastName, address, phone,email,role,laptopId,department} = this.state;
    let isIdValid = false;
    let isFirstNameValid = false;
    let isLastNameValid = false;
    let isAddressValid = false;
    let isDepartmentValid = false;
    let idRegex = /A-[0-9]{4}$/;
    let nameRegex = /^[a-zA-Z ]*$/;
    let laptopRegex =/^[a-z0-9]+$/i;
    let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let phoneRegex = /[1-9][0-9]{9}$/;
    let isEmailValid = false;
    let isPhoneValid = false;
    let isLaptopValid = false;

    if (employeeId === "") {
      this.setState({idError: null});
    } else if (employeeId.match(idRegex)) {
      isIdValid = true;
      this.setState({idError: null});
    } else {
      this.setState({idError: "Please enter a valid Employee ID"});
    }

    if (department === "") {
      this.setState({departmentError: null});
    } else if (department.match(nameRegex)) {
      isDepartmentValid = true;
      this.setState({departmentError: null});
    } else {
      this.setState({departmentError: "Please enter a valid Department"});
    }

    if (firstName === "") {
      this.setState({firstNameError: null});
    } else if (firstName.match(nameRegex)) {
      isFirstNameValid = true;
      this.setState({firstNameError: null});
    } else {
      this.setState({firstNameError: "Please enter a valid First Name"});
    }

    if (lastName === "") {
      this.setState({lastNameError: null});
    } else if (lastName.match(nameRegex)) {
      isLastNameValid = true;
      this.setState({lastNameError: null});
    } else {
      this.setState({lastNameError: "Please enter a valid Last Name"});
    }

    if (laptopId === "") {
      this.setState({laptopError: null});
    } else if (laptopId.match(laptopRegex)) {
      isLaptopValid = true;
      this.setState({laptopError: null});
    } else {
      this.setState({laptopError: "Please enter a valid Laptop ID"});
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

    if (isIdValid && isFirstNameValid && isLastNameValid  && isEmailValid && isPhoneValid && isDepartmentValid && isLaptopValid) {
      this.setState({submitDisabled: false});
    }
    if (!isIdValid || !isFirstNameValid || !isLastNameValid || !isEmailValid || !isPhoneValid || !isDepartmentValid || !isLaptopValid) {
      this.setState({submitDisabled: true});
    }

  }

  onSubmit = e => {
    e.preventDefault();

    const {employeeId, firstName, lastName, address, phone,email,role,laptopId,department} = this.state;
    this.setState({loading: true});
    axios.post("http://localhost:8081/employee", {employeeId, firstName, lastName, address, phone,email,role,laptopId,department}).then(result => {
      let data = result.data;
      this.setState({loading: false});
      if(data === "") {
        this.setState({failure: true});
      } else {
        this.setState({success: true});
      }
      this.props.clearContact();
    });
  };

  render() {
    const { employeeId, firstName, lastName, address, phone,email,role,laptopId,department } = this.props.contact;
    return (
      <section>
        <NavItem/>
        <div className="container">
          <MuiThemeProvider>
            <div >
              <br/>
              <h3 style={{maxWidth: "100%"}}>Add Employee</h3>
              <form onSubmit={this.onSubmit}>
                <div className="inputFormBox">
                <div className={"row"}>
                  <div className="col-sm-6 col-md-6">
                <TextField
                    style={{maxWidth: "100%"}}
                    errorText={this.state.idError}
                    hintText="Enter Employee ID"
                    floatingLabelText="Employee ID"
                    onChange={e => this.changeValue(e, 'employeeId')}
                    onBlur={this.isDisabled}
                />
                  </div>
                  <div className="col-sm-6 col-md-6">
                <TextField
                    style={{maxWidth: "100%"}}
                    errorText={this.state.firstNameError}
                    hintText="Enter First Name"
                    floatingLabelText="First Name"
                    onChange={e => this.changeValue(e, 'firstName')}
                    onBlur={this.isDisabled}
                />
                  </div>
                </div>
                  <div className={"row"}>
                  <div className="col-sm-6 col-md-6">
                <TextField
                    style={{maxWidth: "100%"}}
                    errorText={this.state.lastNameError}
                    hintText="Enter Last Name"
                    floatingLabelText="Last Name"
                    onChange={e => this.changeValue(e, 'lastName')}
                    onBlur={this.isDisabled}
                />
                  </div>
                    <div className="col-sm-6 col-md-6">
                <TextField
                    style={{maxWidth: "100%"}}
                    hintText="Enter Your Address"
                    floatingLabelText="Address"
                    onChange={e => this.changeValue(e, 'address')}
                    onBlur={this.isDisabled}
                />
                    </div>
                  </div>
                <div className={"row"}>
                    <div className="col-sm-6 col-md-6">
                <TextField
                    style={{maxWidth: "100%"}}
                    errorText={this.state.emailError}
                    hintText="Enter your Email"
                    floatingLabelText="Email"
                    onChange={e => this.changeValue(e, 'email')}
                    onBlur={this.isDisabled}
                />
                    </div>

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
                </div>
                <div className={"row"}>
                  <div className="col-sm-6 col-md-6">
                <TextField
                    style={{maxWidth: "100%"}}
                    errorText={this.state.departmentError}
                    hintText="Enter your Department"
                    floatingLabelText="Department"
                    onChange={e => this.changeValue(e, 'department')}
                    onBlur={this.isDisabled}
                />
                  </div>

                  <div className="col-sm-6 col-md-6">
                <TextField
                    style={{maxWidth: "100%"}}
                    errorText={this.state.laptopError}
                    hintText="Enter your Laptop ID"
                    floatingLabelText="Laptop Id"
                    onChange={e => this.changeValue(e, 'laptopId')}
                    onBlur={this.isDisabled}
                />
                  </div>
                </div>
                </div>
                <br></br>
                <div className={"row"}>
                  <div className="col-sm-12 col-md-12">
                <RaisedButton style={{maxWidth: "100%"}} label="Add Employee" type='submit' primary={true}
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
                      Employee added successfully
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

const Create = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateContact);

export default Create;
