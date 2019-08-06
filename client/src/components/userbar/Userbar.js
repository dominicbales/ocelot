import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Card, Dropdown, Icon, Label, Menu } from "semantic-ui-react";

export class Userbar extends Component {
  render() {
    return (
      <Card className="userbar-container flex-align-items-end">
        <Menu size="mini" compact>
          <Menu.Item as={NavLink} to="/dashboard/profile">
            <Icon name="user" />
            <Label size="mini" color="red" floating>
              22
            </Label>
          </Menu.Item>
        </Menu>
      </Card>
    );
  }
}

export default Userbar;
