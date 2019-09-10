import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Card, Image } from "semantic-ui-react";

import { setInviteNotification } from "../../redux/actions/user";

import { localURL } from "../../../api";

const AcceptInviteModal = ({
  isShowing,
  hide,
  user,
  currentUser,
  setInviteNotification
}) => {
  const handleApproved = async () => {
    const result = await axios.delete(
      `${localURL}api/user/invite/${currentUser._id}/notification/${user._id}`
    );
    setInviteNotification(result.data);
    hide();
  };

  const handleDeny = async () => {
    const result = await axios.delete(
      `${localURL}api/user/invite/${currentUser._id}/notification/${user._id}`
    );
    setInviteNotification(result.data);
    hide();
  };
  return (
    <React.Fragment>
      {isShowing
        ? ReactDOM.createPortal(
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#1b1c1dad",
                position: "absolute",
                top: "0px"
              }}
            >
              <Card
                style={{
                  position: "absolute",
                  top: "30%",
                  left: "40%"
                }}
              >
                {console.log("modal user:", user)}
                <Card.Content>
                  <Image size="mini" src={user.inviteSenderImage} />
                  <Card.Description>
                    {user.inviteSenderUsername} invited you to join{" "}
                    <span>{user.projectName}</span>. Would you like to join?
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button onClick={handleApproved} basic color="green">
                      Approve
                    </Button>
                    <Button onClick={handleDeny} basic color="red">
                      Decline
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </div>,
            document.body
          )
        : null}
    </React.Fragment>
  );
};

export default connect(
  null,
  { setInviteNotification }
)(AcceptInviteModal);
