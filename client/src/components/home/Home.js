import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { signin, signout } from "../../redux/actions/user";
import { connect } from "react-redux";
// import { socket, addNotif } from "../../events/test";
import axios from "axios";
import { localURL } from "../../../api";
// Components
import Navbar from "../navbar/Navbar";
import HomeHeader from "../home/header/HomeHeader";
import HomeContent from "../home/content/HomeContent";

export class Home extends Component {
  state = {
    signedIn: false,
    data: {
      name: "empty"
    }
  };
  componentDidMount() {
    // socket.on('show_notification', (data) => {
    //     console.log('inside shownoti listener:', data)
    //     this.setState({data: data})
    // });
  }
  componentWillUnmount() {
    // socket.off();
  }
  handleRedirect = () => {
    this.setState({ signedIn: !this.state.signedIn });
  };
  // handleAddNotif = () => {
  //   const user = {
  //     email: "test2@test.com"
  //   };
  //   addNotif(user);
  // };
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
  handleCheckCurrentUser = async () => {
    const data = await axios.get(`${localURL}api/user/current`);
    console.log("user is:", data);
  };
  handleSignout = () => {
    this.props.signout();
  };

  handleAddProject = async () => {
    const { user } = this.props;
    const data = await axios.post(`${localURL}api/projects/${user._id}`);
    console.log("added new project:", data);
  };
  render() {
    return (
      <div style={{ backgroundColor: "#fefefe", height: "100%" }}>
        <Navbar />
        <HomeHeader />
        <HomeContent />
        <div>
          {/* <h1>data is {this.state.data.name}</h1>
          <button onClick={this.handleAddProject}>Add new project</button>
          <button onClick={this.handleCreateUser}>Create</button>
          <button onClick={this.handleSignin}>signin</button>
          <button onClick={this.handleSignout}>signout</button>
          <button onClick={this.handleCheckCurrentUser}>
            check current user
          </button>
          <button onClick={this.handleRedirect}>Redirect</button>
          {this.state.signedIn ? (
            <Redirect exact to="/dashboard" />
          ) : (
            <div>Home</div>
          )} */}
        </div>
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
)(Home);
