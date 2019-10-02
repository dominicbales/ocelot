import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Input, Button } from "semantic-ui-react";
import { localURL } from "../../../api";
import { signin } from "../../redux/actions/user";
// Components
import Navbar from "../../components/navbar/Navbar";

export class Signup extends Component {
  state = {
    email: "",
    password: "",
    username: ""
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
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    };
    const data = await axios.post(`${localURL}api/user/register`, user);
    await this.props.signin(user);
    this.props.history.push("/dashboard");
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, username } = this.state;
    return (
      <div style={{ height: "100%" }}>
        <Navbar />
        <div
          style={{ height: "80%" }}
          className="flex flex-column flex-justify-center flex-align-items-center"
        >
          <Input
            className="signup-signin-input-style"
            icon="users"
            iconPosition="left"
            placeholder="email"
            value={email}
            name="email"
            onChange={this.handleInputChange}
          />
          <Input
            className="signup-signin-input-style"
            icon="lock"
            iconPosition="left"
            placeholder="Username"
            value={username}
            name="username"
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
          <Button onClick={this.handleCreateUser}>Sign up</Button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { signin }
)(Signup);
