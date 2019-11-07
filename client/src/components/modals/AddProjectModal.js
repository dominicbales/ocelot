import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Input, Form, Header, Button } from "semantic-ui-react";
// Action
import {
  addProjects,
  fetchProjectsByOwnership
} from "../../redux/actions/project";

export class AddProjectModal extends Component {
  state = {
    privacy: "public",
    name: ""
  };

  handleSubmit = async e => {
    const {
      addProjects,
      user,
      fetchProjectsByOwnership,
      handleOpenModal
    } = this.props;
    await addProjects(user._id, this.state);
    await fetchProjectsByOwnership(user._id);
    handleOpenModal();
  };

  handlePrivacyChange = e => {
    this.setState({ privacy: e.target.value });
  };

  handleNameInput = e => {
    this.setState({ name: e.target.value });
  };

  render() {
    const { name } = this.state;
    console.log("add project model");
    return (
      <div className="add-project-modal-container">
        <Card className="add-project-modal-style flex-justify-center flex-align-items-center">
          <Header size="medium">Creating New Project</Header>
          <Form
            onChange={this.handlePrivacyChange}
            style={{ width: "30%", textAlign: "center" }}
          >
            <Form.Group widths="equal">
              {/* <Form.Field label='An HTML <input>' control='input' /> */}
              <Form.Field label="Public or Private" control="select">
                <option value="public">Public</option>
                <option value="private">Private</option>
              </Form.Field>
            </Form.Group>
          </Form>
          <div>Project Name</div>
          <Input
            style={{ width: "60%" }}
            value={name}
            onChange={this.handleNameInput}
            placeholder="Name"
          />
          <div style={{ marginTop: "20px" }}>
            <Button onClick={this.handleSubmit}>Submit</Button>
            <Button onClick={this.props.handleOpenModal}>Close</Button>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.User.currentUser
});

export default connect(
  mapStateToProps,
  { addProjects, fetchProjectsByOwnership }
)(AddProjectModal);
