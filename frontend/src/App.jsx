import React, { Component } from "react";
import ReactDOM from "react-dom";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import ContactList from "./components/ContactList";
import NavItem from "./components/NavItem";
import EmployeeList from "./components/EmployeeList";
import SimpleTabs from "./components/SimpleDashboardTabs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };
    this.state ={
        contactsCount : 0
    }
    this.userName = localStorage.getItem("username");
    this.refreshData = this.refreshData.bind(this)
  }




  refreshData(){
    console.log("shshsh event")
    this.setState({
      contactsCount: this.state.contactsCount+1

    });
  }

  render() {

    if(localStorage.getItem("isAuthenticated") === null) {
      return   <Redirect to={{
        pathname: '/login'}
      } />
    } else {
      return (<section>
            <NavItem refreshEmployee={this.refreshData} />

            <h2>Welcome {this.userName},</h2>
            <SimpleTabs contacts={this.state.contacts}  contactsCount={this.state.contactsCount} refreshEmployee={this.refreshData}/>
          </section>);
    }
  }
}

export default App;
