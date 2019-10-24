import React, { Component } from "react";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
export const socket = socketIOClient("http://localhost:3000");
import { Responsive, Segment } from "semantic-ui-react";
// Actions
import {
  fetchProjectsByUserArray,
  setIsOnline
} from "../../redux/actions/project";
import { fetchUserInviteNotification } from "../../redux/actions/user";

// Components
import Sidebar from "../../components/sidebar/Sidebar";
import ContentArea from "../../components/contentArea/ContentArea";

export class Dashboard extends Component {
  async componentDidMount() {
    const {
      user,
      fetchProjectsByUserArray,
      fetchUserInviteNotification,
      setIsOnline,
      projects
    } = this.props;
    await fetchProjectsByUserArray(user._id);
    await fetchUserInviteNotification(user._id);
    socket.emit("user_connecting", user._id);
    // socket.on("user_connected", function(ioUser) {
    //   console.log("SERVER MSG:", ioUser);
    // });
  }

  componentWillUnmount() {
    const { user, setIsOnline, activeProject } = this.props;
    if (activeProject !== null) {
      let removeProjectMeta = {
        user,
        id: activeProject._id
      };
      // remove from online
      socket.emit("remove_user_from_project_online", removeProjectMeta);
      socket.on("user_was_removed_online", onlineData => {
        setIsOnline(onlineData);
      });
    }

    socket.emit("disconnecting", user._id);
    // socket.on("user_disconnected", function(msg) {
    //   console.log("SERVER MSG:", msg);
    // });
    // debugger;
  }

  render() {
    return (
      <Segment.Group className="app-container">
        <Responsive
          style={{ height: "100%", padding: 0 }}
          as={Segment}
          minWidth={1024}
        >
          <div className="app-container">
            <Sidebar />
            <ContentArea />
          </div>
        </Responsive>
        <Responsive
          minWidth={320}
          maxWidth={1023}
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#564c73",
            color: "rgb(232, 232, 232)"
          }}
        >
          <div
            style={{
              fontSize: "24px",
              padding: "5px",
              textAlign: "center"
            }}
          >
            You need to be on Desktop to view this application
          </div>
        </Responsive>
      </Segment.Group>
    );
  }
}

const mapStateToProps = state => ({
  user: state.User.currentUser,
  activeProject: state.Project.activeProject,
  projects: state.Project.projects
});

export default connect(
  mapStateToProps,
  { fetchProjectsByUserArray, fetchUserInviteNotification, setIsOnline }
)(Dashboard);
