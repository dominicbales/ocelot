import React, { Component } from "react";
import { Input, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <Menu secondary>
        <Menu.Item
          className="nav-brand-style"
          as={NavLink}
          exact
          to="/"
          name="Ocelot"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        />

        <Menu.Menu position="right">
          <Menu.Item
            as={NavLink}
            exact
            to="/signin"
            name="signin"
            active={activeItem === "signin"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={NavLink}
            to="/signup"
            exact
            name="signup"
            active={activeItem === "signup"}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Navbar;
