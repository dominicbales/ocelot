import React, { Component } from "react";
import axios from "axios";
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
      //   console.log("ayy:", searchedUser[data.value[i]]);
      invitedUsers.push(searchedUser[data.value[i]]);
    }
    console.log("adding to pro:", invitedUsers);
    this.setState({ invitedUser: invitedUsers });
  };
  handleSendInvite = () => {
    console.log("inviting users:", this.state.invitedUser);
  };
  render() {
    return (
      <div
        style={{ height: "100%" }}
        className="flex flex-justify-center flex-align-items-center"
      >
        <Dropdown
          placeholder="State"
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

export default Invite;
