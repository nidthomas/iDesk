import React, {Component} from "react";
import axios from "axios";
import NavItem from "./NavItem";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import * as actions from "../actions/action_index";
import {connect} from "react-redux";


class CreateComponent extends Component {
    constructor(props) {
        super(props);
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

    onSubmit = e => {
        e.preventDefault();

        const { employeeId, firstName, lastName, address, phone,email,role,laptopId , department } = this.props.contact;

        axios.post("http://localhost:8081/employee", { employeeId, firstName, lastName, address, phone,email,role,laptopId, department }).then(result => {
            this.props.clearContact();
            this.props.handleClose();
        });
    };

    render() {
        const { employeeId, firstName, lastName, address, phone,email,role,laptopId, department, employeeImage } = this.props.contact;
        return (
            <section>

                <div class="container">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div className="col-sm-12 col-md-12">
                            <form onSubmit={this.onSubmit}>
                                <div className={"row"}>
                                <div className="col-sm-6 col-md-6">

                                <div class="form-group">
                                    <label for="employeeId">Employee Id</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="employeeId"
                                        value={employeeId}
                                        onChange={event => this.onChange("employeeId", event.target.value)}
                                        placeholder="Employee Id"
                                    />
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-6">

                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        value={firstName}
                                        onChange={event => this.onChange("firstName", event.target.value)}
                                        placeholder="First Name"
                                    />
                                </div>
                                </div>
                                </div>
                                <div className={"row"}>
                                <div className="col-sm-6 col-md-6">

                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        value={lastName}
                                        onChange={event => this.onChange("lastName", event.target.value)}
                                        placeholder="Last Name"
                                    />
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-6">

                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={phone}
                                        onChange={event => this.onChange("phone", event.target.value)}
                                        placeholder="phone"
                                    />
                                </div>
                                </div>
                                </div>
                                <div className={"row"}>
                                <div className="col-sm-6 col-md-6">

                                <div class="form-group">
                                    <label for="title">Address:</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="address"
                                        value={address}
                                        onChange={event => this.onChange("address", event.target.value)}
                                        placeholder="Address"
                                    />
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-6">

                                <div className="form-group">
                                    <label htmlFor="department">Department</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="department"
                                        value={department}
                                        onChange={event => this.onChange("department", event.target.value)}
                                        placeholder="Department"
                                    />
                                </div>
                                </div>
                                </div>
                                <div className={"row"}>
                                <div className="col-sm-6 col-md-6">

                                <div class="form-group">
                                    <label for="laptopId">Laptop Id</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="laptopId"
                                        value={laptopId}
                                        onChange={event => this.onChange("laptopId", event.target.value)}
                                        placeholder="Laptop Id"
                                    />
                                </div>
                                </div>
                                <div className="col-sm-6 col-md-6">

                                <div class="form-group">
                                    <label for="publisher">Email:</label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        name="email"
                                        value={email}
                                        onChange={event => this.onChange("email", event.target.value)}
                                        placeholder="Email Address"
                                    />
                                </div>
                                </div>
                                </div>
                                <div className={"row"}>
                                <div className="col-sm-12 col-md-12">

                                <button type="submit" class="btn btn-info">
                                    Submit
                                </button>
                                </div>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch);
};

function mapStateToProps(state) {
    return {
        contact: state.contact
    };
}

const CreateEmployee = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateComponent);

export default CreateEmployee;