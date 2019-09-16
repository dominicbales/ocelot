import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Icon, Button, Card, Popup, Modal } from "semantic-ui-react";
// Actions
import {
  addProjects,
  fetchProjectsByOwnership,
  fetchProject
} from "../../redux/actions/project";

// Components
import AddProjectModal from "../modals/AddProjectModal";

export class Sidebar extends Component {
  state = {
    open: false
  };

  // Remove this and use hooks
  handleOpenModal = () => {
    this.setState({ open: !this.state.open });
  };

  handleProjectClick = async id => {
    const { user, location, history } = this.props;
    await this.props.fetchProject(id);
    if (location.pathname !== "/dashboard") {
      history.push("/dashboard");
    }
  };
  render() {
    const { open } = this.state;
    const { projects } = this.props;
    const projectList = projects.map(val => {
      return (
        <div key={val._id}>
          {/* <img src={val.projectImg} /> */}
          <Button
            style={{ background: `url(${val.projectImg})` }}
            onClick={() => this.handleProjectClick(val._id)}
            className="sidebar-project-btn"
            circular
          />
        </div>
      );
    });

    return (
      <div className="flex flex-column  flex-align-items-center sidebar-container">
        <div className="flex flex-column flex-justify-center flex-align-items-center sidebar-divider">
          <Popup
            content="Add a project"
            trigger={
              <Button onClick={this.handleOpenModal} circular icon="plus" />
            }
          />
        </div>
        {open && (
          <AddProjectModal open={open} handleOpenModal={this.handleOpenModal} />
        )}
        <div>{projectList}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.User.currentUser,
  projects: state.Project.projects
});

export default withRouter(
  connect(
    mapStateToProps,
    { addProjects, fetchProjectsByOwnership, fetchProject }
  )(Sidebar)
);
