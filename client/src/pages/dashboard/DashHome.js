import React, { Component } from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import AddProjectModal from "../../components/modals/AddProjectModal";

export class DashHome extends Component {
  state = {
    openModal: false
  };
  handleOpenModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };
  render() {
    const { openModal } = this.state;
    console.log("open:", openModal);
    return (
      <div
        className="flex flex-justify-center flex-align-items-center"
        style={{ height: "95%" }}
      >
        <Segment style={{ height: "100%", width: "100%" }} placeholder>
          <Header icon>
            <Icon name="pdf file outline" />
            No project is selected, please select project or create new one.
          </Header>
          <Button onClick={this.handleOpenModal} primary>
            Create Project
          </Button>
        </Segment>
        {openModal && (
          <AddProjectModal
            open={openModal}
            handleOpenModal={this.handleOpenModal}
          />
        )}
      </div>
    );
  }
}

export default DashHome;
