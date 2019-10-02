import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";
import { signin, signout } from "../../redux/actions/user";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { localURL } from "../../../api";
// Components
import Navbar from "../../components/navbar/Navbar";

export class Signin extends Component {
  state = {
    email: "",
    password: ""
  };
  handleSignin = () => {
    const user = {
      email: this.state.email,
      password: this.state.password
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

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { user } = this.props;
    const { email, password } = this.state;
    return (
      <div style={{ height: "100%" }}>
        <Navbar />
        {user ? (
          <Redirect to="/dashboard" />
        ) : (
          <div
            style={{ height: "80%" }}
            className="flex flex-column flex-justify-center flex-align-items-center"
          >
            <Input
              className="signup-signin-input-style"
              icon="users"
              iconPosition="left"
              placeholder="Email"
              value={email}
              name="email"
              onChange={this.handleInputChange}
            />
            <Input
              className="signup-signin-input-style"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              value={password}
              name="password"
              onChange={this.handleInputChange}
            />
            {/* <button onClick={this.handleCreateUser}>Create</button> */}
            <Button onClick={this.handleSignin}>Signin</Button>
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
