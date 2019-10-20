import * as React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Dropdown, Button } from "semantic-ui-react";
import { localURL } from "../../../api";

interface InviteProps {
  children?: React.ReactNode;
  currentProject: {
    name: string;
    _id: string;
  };
  user: {
    profileImageUrl: string;
    username: string;
    _id: string;
  };
}

const Invite: React.FC = ({ currentProject, user }: InviteProps) => {
  const [invitedUser, setInvitedUser] = React.useState([]);
  const [searchedUser, setSearchedUser] = React.useState([]);
  // Problem using types on stateOptions, it would need dropdownprops to be define also
  const [stateOptions, setStateOptions] = React.useState([]);

  const handleSearchChange = async (event, data) => {
    const result = await axios.get(
      `${localURL}api/user/search/${data.searchQuery}`
    );
    const options = result.data.map((val, idx) => {
      return { key: idx, text: val.username, value: idx };
    });
    setStateOptions(options);
    setSearchedUser(result.data);
  };

  const handleOnChange = (event, data) => {
    let invitedUsersPlaceholder = [];

    for (let i = 0; i < data.value.length; i++) {
      invitedUsersPlaceholder.push(searchedUser[data.value[i]]);
    }
    setInvitedUser(invitedUsersPlaceholder);
  };

  const handleSendInvite = async () => {
    const payloadObject = {
      invitedUsers: invitedUser,
      projectName: currentProject.name,
      inviteSenderUsername: user.username,
      inviteSenderImage: user.profileImageUrl
    };
    await axios.post(
      `${localURL}api/user/invite/${currentProject._id}/user/${user._id}`,
      payloadObject
    );
  };

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
        onChange={handleOnChange}
        options={stateOptions}
        onSearchChange={handleSearchChange}
      />
      <Button onClick={handleSendInvite}>Send Invite</Button>
    </div>
  );
};

const mapStateToProps = state => ({
  currentProject: state.Project.activeProject,
  user: state.User.currentUser
});

export default connect(
  mapStateToProps,
  null
)(Invite);
