import React, { Component } from "react";
import { signin, signout } from "../../redux/actions/user";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { localURL } from "../../../api";
// Components
import Navbar from "../navbar/Navbar";

export class Signin extends Component {
  handleSignin = () => {
    const user = {
      email: "test6@test.com",
      password: "123456"
    };
    this.props.signin(user);
  };
  handleCreateUser = async () => {
    const user = {
      email: "test6@test.com",
      password: "123456",
      username: "nothing"
    };
    const data = await axios.post(`${localURL}api/user/register`, user);
    console.log("create data is:", data);
  };
  render() {
    const { user } = this.props;
    return (
      <div>
        <Navbar />
        {user ? (
          <Redirect to="/dashboard" />
        ) : (
          <div>
            <button onClick={this.handleCreateUser}>Create</button>
            <button onClick={this.handleSignin}>signin</button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.User.currentUser
});

export default connect(
  mapStateToProps,
  { signin, signout }
)(Signin);
