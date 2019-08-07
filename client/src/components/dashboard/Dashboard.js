import React, { Component } from "react";
import { connect } from "react-redux";
// Actions
import { fetchProjects } from "../../redux/actions/project";
import { fetchUserInviteNotification } from "../../redux/actions/user";
// Components
import Sidebar from "../sidebar/Sidebar";
import ContentArea from "../contentArea/ContentArea";

export class Dashboard extends Component {
  state = {};

  async componentDidMount() {
    const { user, fetchProjects, fetchUserInviteNotification } = this.props;
    await fetchProjects(user._id);
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
  { fetchProjects, fetchUserInviteNotification }
)(Dashboard);
