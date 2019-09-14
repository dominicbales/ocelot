import React, { useState } from "react";
import moment from "moment";
import { Feed, Icon, Image, List, Divider, Card } from "semantic-ui-react";
import { connect } from "react-redux";

import useModal from "../modals/useModal";

import AcceptInviteModal from "../modals/AcceptInviteModal";

const Profile = ({ inviteNotification, currentUser }) => {
  const [user, setUser] = useState();
  const { isShowing, toggle } = useModal();

  const selectUserForModal = user => {
    setUser(user);
    toggle();
  };

  const notificationList = inviteNotification.map(val => {
    return (
      <Feed.Event onClick={() => selectUserForModal(val)} key={val._id}>
        <Feed.Label>
          <img src={val.inviteSenderImage} />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{val.inviteSenderUsername}</Feed.User> invited you to
            project
            <a> {val.projectName}</a>
            <Feed.Date>
              {moment(val.createdAt)
                .startOf()
                .fromNow()}
            </Feed.Date>
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    );
  });

  return (
    <div
      className="flex"
      style={{ padding: "20px", justifyContent: "space-between" }}
    >
      <AcceptInviteModal
        currentUser={currentUser}
        user={user}
        isShowing={isShowing}
        hide={toggle}
      />
      <div className="flex">
        <div>
          <Image src={currentUser.profileImageUrl} size="small" circular />
          <Divider />
          <List>
            <List.Item icon="users" content={currentUser.username} />
            <List.Item icon="marker" content="New York, NY" />
            <List.Item
              icon="mail"
              content={
                <a href={`mailto:${currentUser.email}`}>{currentUser.email}</a>
              }
            />
          </List>
        </div>
        <div style={{ marginLeft: "25px" }}>
          <h1>Notification</h1>
          <Feed>{notificationList}</Feed>
        </div>
      </div>

      {/* <div>
        <Card>
          <Card.Content>
            <Card.Header>Recent Activity</Card.Header>
          </Card.Content>
          <Card.Content>
            <Feed>
              <Feed.Event>
                <Feed.Label image="/images/avatar/small/jenny.jpg" />
                <Feed.Content>
                  <Feed.Date content="1 day ago" />
                  <Feed.Summary>
                    You added <a>Jenny Hess</a> to your <a>coworker</a> group.
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Label image="/images/avatar/small/molly.png" />
                <Feed.Content>
                  <Feed.Date content="3 days ago" />
                  <Feed.Summary>
                    You added <a>Molly Malone</a> as a friend.
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Label image="/images/avatar/small/elliot.jpg" />
                <Feed.Content>
                  <Feed.Date content="4 days ago" />
                  <Feed.Summary>
                    You added <a>Elliot Baker</a> to your <a>musicians</a>{" "}
                    group.
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Card.Content>
        </Card>
      </div> */}
    </div>
  );
};

const mapStateToProps = state => ({
  inviteNotification: state.User.inviteNotification,
  currentUser: state.User.currentUser
});

export default connect(
  mapStateToProps,
  null
)(Profile);
