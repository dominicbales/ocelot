import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Feed, Icon } from "semantic-ui-react";
import { connect } from "react-redux";

export class Profile extends Component {
  render() {
    const { inviteNotification } = this.props;
    const notificationList = inviteNotification.map(val => {
      return (
        <Feed.Event key={val._id}>
          <Feed.Label>
            <img src={val.inviteSenderImage} />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>{val.inviteSenderUsername}</Feed.User> invited you to
              project
              <a> {val.projectName}</a>
              <Feed.Date>1 Hour Ago</Feed.Date>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      );
    });
    return (
      <div>
        <h1>Notification</h1>
        <Feed>{notificationList}</Feed>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  inviteNotification: state.User.inviteNotification
});

export default connect(
  mapStateToProps,
  null
)(Profile);
