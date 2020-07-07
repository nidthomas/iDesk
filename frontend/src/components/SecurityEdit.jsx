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

class EditSecurity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {},
            selectedFile: null
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8081/securities/" + this.props.match.params.id).then(response => {
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
        const {  id, name, email, phone, location,buildingNo,role} = this.props.contact;

        axios.put("http://localhost:8081/securities/" + this.props.contact.id, {id, name, email, phone, location,buildingNo}).then(result => {
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
                            <h3 style={{maxWidth: "100%"}}>Edit Security</h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="inputFormBox">
                                    <div className={"row"}>
                                        <div className="col-sm-6 col-md-6">
                                            <TextField
                                                style={{maxWidth: "100%"}}
                                                errorText={this.state.idError}
                                                value={this.props.contact.id}
                                                onChange={event => this.onChange("id", event.target.value)}
                                                floatingLabelText="Employee ID"
                                                onBlur={this.isDisabled}
                                            />
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <TextField
                                                style={{maxWidth: "100%"}}
                                                errorText={this.state.nameError}
                                                value={this.props.contact.name}
                                                onChange={event => this.onChange("name", event.target.value)}
                                                floatingLabelText="Name"
                                                onBlur={this.isDisabled}
                                            />
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className="col-sm-6 col-md-6">
                                            <TextField
                                                style={{maxWidth: "100%"}}
                                                value={this.props.contact.location}
                                                onChange={event => this.onChange("location", event.target.value)}
                                                floatingLabelText="Location"
                                                onBlur={this.isDisabled}
                                            />
                                        </div>


                                        <div className="col-sm-6 col-md-6">
                                            <TextField
                                                style={{maxWidth: "100%"}}
                                                errorText={this.state.phoneError}
                                                value={this.props.contact.phone}
                                                onChange={event => this.onChange("phone", event.target.value)}
                                                floatingLabelText="Phone"
                                                onBlur={this.isDisabled}
                                            />
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className="col-sm-6 col-md-6">
                                            <TextField
                                                style={{maxWidth: "100%"}}
                                                value={this.props.contact.buildingNo}
                                                onChange={event => this.onChange("buildingNo", event.target.value)}
                                                floatingLabelText="Building No"
                                                onBlur={this.isDisabled}
                                            />
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <TextField
                                                style={{maxWidth: "100%"}}
                                                errorText={this.state.emailError}
                                                value={this.props.contact.email}
                                                onChange={event => this.onChange("email", event.target.value)}
                                                floatingLabelText="Email"
                                                onBlur={this.isDisabled}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div className={"row"}>
                                    <div className="col-sm-12 col-md-12">
                                        <RaisedButton style={{maxWidth: "100%"}} label="Update Security" type='submit' primary={true}
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
                                            Security updated successfully
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


                </div>
            </section>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch);
};

const SecurityEdit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditSecurity);
export default SecurityEdit;
