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

  handleCheckCurrentUser = async () => {
    const data = await axios.get(`${localURL}api/user/current`);
    console.log("user is:", data);
  };

  render() {
    return (
      <div style={{ backgroundColor: "#fefefe", height: "100%" }}>
        <Navbar />
        <HomeHeader />
        <HomeContent />
        <div />
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
