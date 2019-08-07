import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Dropdown, Icon, Label, Menu } from "semantic-ui-react";

export class Userbar extends Component {
  render() {
    const { inviteNotification } = this.props;
    return (
      <Card className="userbar-container flex-align-items-end">
        <Menu size="mini" compact>
          <Menu.Item as={NavLink} to="/dashboard/profile">
            <Icon name="user" />
            {inviteNotification.length !== 0 ? (
              <Label size="mini" color="red" floating>
                {inviteNotification.length}
              </Label>
            ) : null}
          </Menu.Item>
        </Menu>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  inviteNotification: state.User.inviteNotification
});

export default connect(
  mapStateToProps,
  null
)(Userbar);
