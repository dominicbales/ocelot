import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { localURL } from "../../../api";
import { Icon, Button, Card, Popup, Modal } from "semantic-ui-react";
import { socket } from "../../pages/dashboard/Dashboard";
// Actions
import {
  addProjects,
  fetchProjectsByOwnership,
  fetchProject,
  setIsOnline
} from "../../redux/actions/project";
// Components
import AddProjectModal from "../modals/AddProjectModal";

export class Sidebar extends Component {
  state = {
    open: false
  };

  componentDidUpdate(prevProps) {
    if (prevProps.activeProject === null && this.props.activeProject !== null) {
      console.log("this is the first project select");

      let projectMeta = {
        user: this.props.user,
        id: this.props.activeProject._id
      };
      socket.emit("joined_project", projectMeta);
      socket.on("joined_returned_data", msg => {
        // console.log("join project online");
        // alert("sign in");
        this.props.setIsOnline(msg);
      });
    }
    if (prevProps.activeProject !== null && this.props.activeProject !== null) {
      // console.log("this isnt the first project select");
      let removeProjectMeta = {
        user: prevProps.user,
        id: prevProps.activeProject._id
      };
      let projectMeta = {
        user: this.props.user,
        id: this.props.activeProject._id
      };
      // remove from online
      socket.emit("remove_user_from_project_online", removeProjectMeta);
      socket.on("user_was_removed_online", onlineData => {
        // console.log("remove from project online");
        // alert("sign out");
        this.props.setIsOnline(onlineData);
      });
      socket.emit("joined_project", projectMeta);
      socket.on("joined_returned_data", msg => {
        // console.log("join project online");
        // alert("sign in");
        this.props.setIsOnline(msg);
      });
    }
  }

  // causes AddProjectModal not to open
  // check if state open changes and then it should rerender
  // shouldComponentUpdate(nextProps) {
  //   if (
  //     this.props.activeProject === null ||
  //     nextProps.activeProject !== this.props.activeProject
  //   ) {
  //     return true;
  //   }
  //   return false;
  // }

  // Remove this and use hooks
  handleOpenModal = () => {
    console.log("open was clicked");
    this.setState({ open: !this.state.open });
  };

  handleProjectClick = async id => {
    const { user, location, history, activeProject, setIsOnline } = this.props;
    let projectMeta = {
      user,
      id
    };
    if (activeProject) {
      if (id !== activeProject._id) {
        await this.props.fetchProject(id);
      } else {
        console.log("that project is already set");
      }
    } else {
      await this.props.fetchProject(id);
    }

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
  projects: state.Project.projects,
  activeProject: state.Project.activeProject
});

export default withRouter(
  connect(
    mapStateToProps,
    { addProjects, fetchProjectsByOwnership, fetchProject, setIsOnline }
  )(Sidebar)
);
