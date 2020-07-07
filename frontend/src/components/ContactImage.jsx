import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as actions from "../actions/action_index";
import { connect } from "react-redux";
import NavItem from "./NavItem";

function mapStateToProps(state) {
    return {
        contact: state.contact,
        imageUrl: state.imageUrl
    };
}

class Logo extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.showImage({
            contactId: this.props.match.params.id
        });
    }

    onChangeContactImage = event => {
        const data = new FormData();
        data.append("file", event.target.files[0]);
        let contactId = this.props.match.params.id;

        axios.post("http://localhost:8081/contact/upload/" + contactId, data, {}).then(response => {
            this.props.history.push("/");
        });
    };

    render() {
        return (
            <section>
                <NavItem />
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Edit Contact Image</h3>
                        </div>
                        <div className="panel-body">
                            <form onSubmit={this.onSubmit} enctype="multipart/form-data">
                                <div className="form-group">
                                    {this.props.imageUrl && <img className="contact-image" src={this.props.imageUrl} alt="contact" />}
                                    <input type="file" name="file" onChange={event => this.onChangeContactImage(event)} />
                                </div>
                            </form>
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

const ContactImage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Logo);
export default ContactImage;
