import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { store } from "./redux/store";
// Actions
import { setUser, signout } from "./redux/actions/user";
// Semantic Components
import { Grid, GridRow, Gri } from "semantic-ui-react";
// Components
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import withAuth from "./helper/withAuth";
import setAuthToken from "./utils/setAuthToken";
// Styles
import "semantic-ui-css/semantic.min.css";
import "./styles/index.scss";
// Event functions
// import { subscribeToTimer } from "./events/test";

//Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and is Authenticated
  store.dispatch(setUser(decoded));
  //Check for expire token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(signout());
    //Todo: Clear current Profile
    //Redirect to Login
    window.location.href = "/signin";
  }
}

export class App extends Component {
  constructor(props) {
    super(props);
    // subscribeToTimer((err, timestamp) => this.setState({
    //   timestamp
    // }));
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={withAuth(Dashboard)} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    );
  }
}

export default App;
