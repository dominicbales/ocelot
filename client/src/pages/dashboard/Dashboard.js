import React, { Component } from "react";
import { connect } from "react-redux";
// Actions
import { fetchProjectsByUserArray } from "../../redux/actions/project";
import { fetchUserInviteNotification } from "../../redux/actions/user";
// Components
import Sidebar from "../../components/sidebar/Sidebar";
import ContentArea from "../../components/contentArea/ContentArea";

export class Dashboard extends Component {
  state = {};

  async componentDidMount() {
    const {
      user,
      fetchProjectsByUserArray,
      fetchUserInviteNotification
    } = this.props;
    await fetchProjectsByUserArray(user._id);
    await fetchUserInviteNotification(user._id);
  }

  render() {
    return (
      <div className="app-container">
        <Sidebar />
        <ContentArea />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.User.currentUser
});

export default connect(
  mapStateToProps,
  { fetchProjectsByUserArray, fetchUserInviteNotification }
)(Dashboard);
