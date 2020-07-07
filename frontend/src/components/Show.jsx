import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import * as actions from "../actions/action_index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { file } from "@babel/types";
import "./../App.css";

function mapStateToProps(state) {
  return {
    contact: state.contact,
    imageUrl: state.imageUrl
  };
}

class ShowContact extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get("http://localhost:8081/employee/" + this.props.match.params.id).then(response => {
      let data = response.data;
      let contact = {
        id: data.id,
        name: data.name,
        address: data.address,
        city: data.city,
        phone: data.phone,
        email: data.email,
        contactImage: data.contactImage
      };
      this.props.showContact({
        contact: contact
      });
    });
  }

  delete(id) {
    console.log(id);
    axios.delete("http://localhost:8081/employee/" + id).then(result => {
      this.props.handleClose();
    });
  }

  render() {
    // let imageUrl = null;
    // if (this.props.contact.id !== "") {
    //   imageUrl = `/file/${this.props.contact.id}`;
    // }
    return (
      <section>
        <NavItem />
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Contact Details</h3>
            </div>
            <div class="panel-body">
              <dl>
                <dd>
                  {this.props.imageUrl && <img className="contact-image" src={this.props.imageUrl} alt="contact" />}
                </dd>
                <dt>Name:</dt>
                <dd>{this.props.contact.name}</dd>
                <dt>Address:</dt>
                <dd>{this.props.contact.address}</dd>
                <dt>City:</dt>
                <dd>{this.props.contact.city}</dd>
                <dt>Phone Number:</dt>
                <dd>{this.props.contact.phone}</dd>
                <dt>Email Address:</dt>
                <dd>{this.props.contact.email}</dd>
              </dl>
              <Link to={`/edit/${this.props.contact.id}`} className="btn btn-success">
                Edit
              </Link>
              &nbsp;
              <button onClick={this.delete.bind(this, this.props.contact.id)} className="btn btn-danger">
                Delete
              </button>
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
const Show = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowContact);
export default Show;
