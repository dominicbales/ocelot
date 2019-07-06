import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { localURL } from "../../../api";
import {
  Header,
  Button,
  Card,
  Icon,
  Divider,
  Comment,
  Form,
  Select,
  TextArea
} from "semantic-ui-react";
// Action
import { fetchIssue, fetchIssueComments } from "../../redux/actions/issue";
// Components
import ShowCommentReplies from "./ShowCommentReplies";

export class Issue extends Component {
  state = {
    option: [
      { value: "active", text: "Open" },
      { value: "closed", text: "Closed" }
    ],
    textFieldValue: "",
    open: false,
    replyTo: {},
    replyInput: ""
  };

  async componentDidMount() {
    console.log("issueData:", this.props.match.params.id);
    await this.props.fetchIssue(this.props.match.params.id);
    await this.props.fetchIssueComments(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.issue !== this.props.issue) {
      return true;
    }
  }

  handleActiveChange = async (e, data) => {
    const activeTemp = {
      active: data.value
    };
    await axios.post(
      `${localURL}api/issues/${this.props.match.params.id}/active`,
      activeTemp
    );
    this.props.fetchIssue(this.props.match.params.id);
  };

  handleTextField = async (e, data) => {
    this.setState({ textFieldValue: data.value });
  };

  handleSubmit = async () => {
    const submitData = {
      comment: this.state.textFieldValue,
      userId: this.props.user._id,
      ownerName: this.props.user.username
    };
    const result = await axios.post(
      `${localURL}api/issues/comment/${this.props.match.params.id}`,
      submitData
    );
    this.setState({ textFieldValue: "" }, async function() {
      await this.props.fetchIssueComments(this.props.match.params.id);
    });
  };

  handleReplyClick = data => {
    this.setState({ open: !this.state.open, replyTo: data });
  };

  handleReplyInputChange = (e, data) => {
    this.setState({ replyInput: data.value });
  };

  handleReplySubmit = async () => {
    const { replyInput, replyTo } = this.state;

    const submitData = {
      reply: replyInput,
      userId: this.props.user._id,
      author: this.props.user.username
    };
    await axios.post(`${localURL}api/issues/reply/${replyTo._id}`, submitData);
    await this.props.fetchIssueComments(this.props.match.params.id);
    this.setState({ open: false, replyInput: "" });
  };

  render() {
    const { issue, issueComments } = this.props;
    const { textFieldValue, open, replyInput, replyTo } = this.state;

    const issueIcon =
      issue.active === "active" ? "check circle outline" : "ban";
    const issueColor = issue.active === "active" ? "rgb(0, 192, 57)" : "red";

    const commentList = issueComments.map(data => {
      return (
        <Comment key={data._id}>
          <Comment.Avatar
            as="a"
            src="https://randomuser.me/api/portraits/men/7.jpg"
          />
          <Comment.Content>
            <Comment.Author as="a">{data.ownerName}</Comment.Author>
            <Comment.Metadata>
              <span>{data.createdAt}</span>
            </Comment.Metadata>
            <Comment.Text>{data.comment}</Comment.Text>
            <Comment.Actions>
              <a onClick={() => this.handleReplyClick(data)}>Reply</a>
            </Comment.Actions>
          </Comment.Content>
          {data.replies.length ? <ShowCommentReplies data={data} /> : null}
        </Comment>
      );
    });

    return (
      <div style={{ padding: "50px", overflowY: "auto" }}>
        <div>
          <Header as="h1">{issue.issueName}</Header>
          <Card
            className="flex flex-row"
            style={{
              width: "80px",
              padding: "5px",
              backgroundColor: issueColor,
              color: "white"
            }}
          >
            <Icon name={issueIcon} />
            {issue.active === "active" ? <p>Open</p> : <p>Closed</p>}
          </Card>
        </div>
        <Divider />
        <div className="flex flex-justify-between">
          <div className="flex">
            <img src="https://randomuser.me/api/portraits/men/86.jpg" />
            <div style={{ marginLeft: "40px" }}>{issue.description}</div>
          </div>
          <div>
            <h5>Active</h5>
            <Select
              onClick={this.handleClick}
              value={issue.active}
              onChange={this.handleActiveChange}
              placeholder="Select status"
              options={this.state.option}
            />
            <h5>Assigned</h5>
          </div>
        </div>
        <Comment.Group threaded>
          <Header as="h3" dividing>
            Comments
          </Header>
          {commentList}
          <Form reply>
            <Form.TextArea
              value={textFieldValue}
              onChange={this.handleTextField}
              disabled={issue.active === "closed"}
            />
            <Button
              onClick={this.handleSubmit}
              disabled={issue.active === "closed"}
              content="Add Comment"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment.Group>
        {open && (
          <div className="add-project-modal-container">
            <Card
              style={{ padding: "10px" }}
              className="add-project-modal-style flex-justify-center flex-align-items-center"
            >
              <Header style={{ paddingBottom: "5px" }} size="medium">
                Replying To {replyTo.ownerName}
              </Header>
              <TextArea
                style={{
                  width: "60%",
                  maxWidth: "90%",
                  minWidth: "60%",
                  minHeight: "15%"
                }}
                value={replyInput}
                onChange={this.handleReplyInputChange}
                placeholder="Description..."
              />
              <div style={{ marginTop: "20px" }}>
                <Button onClick={this.handleReplySubmit}>Submit</Button>
                <Button onClick={this.handleReplyClick}>Close</Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  issue: state.Issue.issue,
  user: state.User.currentUser,
  issueComments: state.Issue.issueComments
});

export default connect(
  mapStateToProps,
  { fetchIssue, fetchIssueComments }
)(Issue);
