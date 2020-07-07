import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store_index";

import Edit from "./components/Edit";
import Create from "./components/Create";
import Show from "./components/Show";
import ContactImage from "./components/ContactImage";
import Users from "./components/Users";
import Login from "./components/Login";
import Security from "./components/Security";

import * as serviceWorker from "./serviceWorker";
import SecurityEdit from "./components/SecurityEdit";


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/edit/:id" render={props => <Edit {...props} />} />
          <Route path="/editsecu/:id" render={props => <SecurityEdit {...props} />} />
          <Route path="/create" component={Create} />
          <Route path="/show/:id" component={Show} />
          <Route path="/logo/:id" component={ContactImage} />
          <Route path="/users" component={Users} />
          <Route path="/login" component={Login} />
          <Route path="/security" component={Security} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
