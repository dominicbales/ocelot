import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  setActiveProject,
  clearProjectState
} from "../../redux/actions/project";
// import {se} from '../../redux/actions/issue'
import { Menu, Icon } from "semantic-ui-react";

import { signout } from "../../redux/actions/user";

export class ProjectMenu extends Component {
  handleItemClick = (event, value) => {
    switch (value.name) {
      case "Signout":
        this.props.clearProjectState();
        this.props.signout();
        break;
      default:
        return;
    }
    this.setState({ activeItem: name });
  };
  render() {
    const { activeMenu } = this.props;
    return (
      <div style={{ minWidth: "205px" }}>
        <Menu className="productmenu-style" vertical>
          <Menu.Item>
            <Menu.Header style={{ color: "white" }}>Overview</Menu.Header>
            <Menu.Menu>
              <Menu.Item
                as={NavLink}
                to="/dashboard/project"
                name={this.props.name ? this.props.name : "No Project Selected"}
                active={activeMenu === "projectName"}
                onClick={() => this.props.handleActiveMenu("projectName")}
              />
              <Menu.Item
                as={NavLink}
                to="/dashboard/invite"
                name="Invite"
                active={activeMenu === "Invite"}
                onClick={() => this.props.handleActiveMenu("Invite")}
              />
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header
              className="flex flex-justify-between"
              style={{ color: "white" }}
            >
              Chat
              <Icon name="add circle" />
            </Menu.Header>
            <Menu.Menu>
              <Menu.Item
                as={NavLink}
                to="/dashboard/coming-soon"
                name="chat1"
                active={activeMenu === "Chat1"}
                onClick={() => this.props.handleActiveMenu("Chat1")}
              />
              <Menu.Item
                as={NavLink}
                to="/dashboard/coming-soon"
                name="chat2"
                active={activeMenu === "Chat2"}
                onClick={() => this.props.handleActiveMenu("Chat2")}
              />
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            <Menu.Header style={{ color: "white" }}>Task</Menu.Header>
            <Menu.Menu>
              <Menu.Item
                as={NavLink}
                to="/dashboard/task"
                name="View All Tasks"
                active={activeMenu === "View All Tasks"}
                onClick={() => this.props.handleActiveMenu("View All Tasks")}
              />
              <Menu.Item
                as={NavLink}
                to="/dashboard/coming-soon"
                name="Assigned Tasks"
                active={activeMenu === "Assigned Tasks"}
                onClick={() => this.props.handleActiveMenu("Assigned Tasks")}
              />
              <Menu.Item
                as={NavLink}
                to="/dashboard/coming-soon"
                name="Active Tasks"
                active={activeMenu === "Active Tasks"}
                onClick={() => this.props.handleActiveMenu("Active Tasks")}
              />
              <Menu.Item
                as={NavLink}
                to="/dashboard/coming-soon"
                name="Closed Tasks"
                active={activeMenu === "Closed Tasks"}
                onClick={() => this.props.handleActiveMenu("Closed Tasks")}
              />
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            <Menu.Header style={{ color: "white" }}>Issues</Menu.Header>
            <Menu.Menu>
              <Menu.Item
                as={NavLink}
                to="/dashboard/issues"
                name="View All Issues"
                active={activeMenu === "View All Issues"}
                onClick={() => this.props.handleActiveMenu("View All Issues")}
              />
              <Menu.Item
                as={NavLink}
                to="/dashboard/coming-soon"
                name="Active Issues"
                active={activeMenu === "Active Issues"}
                onClick={() => this.props.handleActiveMenu("Active Issues")}
              />
              <Menu.Item
                as={NavLink}
                to="/dashboard/coming-soon"
                name="Closed Issues"
                active={activeMenu === "Closed Issues"}
                onClick={() => this.props.handleActiveMenu("Closed Issues")}
              />
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            <Menu.Header style={{ color: "white" }}>Setting</Menu.Header>
            <Menu.Menu>
              <Menu.Item
                as={NavLink}
                to="/dashboard/coming-soon"
                name="Setting"
                active={activeMenu === "Setting"}
                onClick={() => this.props.handleActiveMenu("Setting")}
              >
                Support
              </Menu.Item>
              <Menu.Item
                name="Signout"
                active={activeMenu === "Signout"}
                onClick={this.handleItemClick}
              >
                Signout
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default connect(null, { signout, clearProjectState })(ProjectMenu);
