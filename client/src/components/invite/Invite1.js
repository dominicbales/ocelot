import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Dropdown, Button } from "semantic-ui-react";
import { localURL } from "../../../api";

export class Invite extends Component {
  state = {
    invitedUser: [],
    searchedUser: [],
    stateOptions: []
  };
  handleSearchChange = async (event, data) => {
    const result = await axios.get(
      `${localURL}api/user/search/${data.searchQuery}`
    );
    const options = result.data.map((val, idx) => {
      return { key: idx, text: val.username, value: idx };
    });
    this.setState({ stateOptions: options, searchedUser: result.data });
  };
  handleOnChange = (event, data) => {
    const { searchedUser } = this.state;
    let invitedUsers = [];
    for (let i = 0; i < data.value.length; i++) {
      invitedUsers.push(searchedUser[data.value[i]]);
    }
    this.setState({ invitedUser: invitedUsers });
  };
  handleSendInvite = async () => {
    const { user, currentProject } = this.props;
    const payloadObject = {
      invitedUsers: this.state.invitedUser,
      projectName: currentProject.name,
      inviteSenderUsername: user.username,
      inviteSenderImage: user.profileImageUrl
    };
    const result = await axios.post(
      `${localURL}api/user/invite/${currentProject._id}/user/${user._id}`,
      payloadObject
    );
  };
  render() {
    console.log("currentUser", this.props.currentProject);
    console.log("user:", this.props.user);
    return (
      <div
        style={{ height: "100%" }}
        className="flex flex-justify-center flex-align-items-center"
      >
        <Dropdown
          placeholder="Search for user"
          multiple
          search
          selection
          onChange={this.handleOnChange}
          options={this.state.stateOptions}
          onSearchChange={this.handleSearchChange}
        />
        <Button onClick={this.handleSendInvite}>Send Invite</Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentProject: state.Project.activeProject,
  user: state.User.currentUser
});

export default connect(
  mapStateToProps,
  null
)(Invite);
