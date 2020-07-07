import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import * as actions from "../actions/action_index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import NavItem from "./NavItem";

function mapStateToProps(state) {
  return {
    contact: state.contact
  };
}

class AddUsers extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.clearContact();
  }
  // onChange = (field, value) => {
  //   let currentContact = { ...this.props.contact };

  //   this.props.changeContact({
  //     contact: currentContact,
  //     field: field,
  //     value: value
  //   });
  // };

  onSubmit = () => {
    const [username, password, role] = ["test", "test", "user"];

    axios.post("http://localhost:8081/users", { username, password, role }).then(result => {
      this.props.history.push("/");
    });
  };

  render() {
    return (
      // <section>
      //   <NavItem />
      //   <div class="container">
      //     <div class="panel panel-default">
      //       <div class="panel-heading">
      //         <h3 class="panel-title">ADD CONTACT</h3>
      //       </div>
      //       <div class="panel-body">
      //         <h4>
      //           <Link to="/">
      //             <span class="glyphicon glyphicon-th-list" aria-hidden="true" /> Contacts List
      //           </Link>
      //         </h4>
      //         <form onSubmit={this.onSubmit}>
      //           <div class="form-group">
      //             <label for="isbn">Name:</label>
      //             <input
      //               type="text"
      //               class="form-control"
      //               name="name"
      //               value={name}
      //               onChange={event => this.onChange("name", event.target.value)}
      //               placeholder="Name"
      //             />
      //           </div>
      //           <div class="form-group">
      //             <label for="title">Address:</label>
      //             <input
      //               type="text"
      //               class="form-control"
      //               name="address"
      //               value={address}
      //               onChange={event => this.onChange("address", event.target.value)}
      //               placeholder="Address"
      //             />
      //           </div>
      //           <div class="form-group">
      //             <label for="author">City:</label>
      //             <input
      //               type="text"
      //               class="form-control"
      //               name="city"
      //               value={city}
      //               onChange={event => this.onChange("city", event.target.value)}
      //               placeholder="City"
      //             />
      //           </div>
      //           <div class="form-group">
      //             <label for="published_date">Phone:</label>
      //             <input
      //               type="text"
      //               class="form-control"
      //               name="phone"
      //               value={phone}
      //               onChange={event => this.onChange("phone", event.target.value)}
      //               placeholder="Phone Number"
      //             />
      //           </div>
      //           <div class="form-group">
      //             <label for="publisher">Email:</label>
      //             <input
      //               type="email"
      //               class="form-control"
      //               name="email"
      //               value={email}
      //               onChange={event => this.onChange("email", event.target.value)}
      //               placeholder="Email Address"
      //             />
      //           </div>
      //           <button type="submit" class="btn btn-info">
      //             Submit
      //           </button>
      //         </form>
      //       </div>
      //     </div>
      //   </div>
      // </section>
      <section>
        <NavItem />
        <button type="button" class="btn btn-info" onClick={() => this.onSubmit()}>
          Add User
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

const Users = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUsers);

export default Users;
