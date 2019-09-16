import React, { Component } from "react";
import {
  Input,
  Message,
  Button,
  Icon,
  Table,
  Pagination
} from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
// Actions
import { addIssue, fetchIssues } from "../../redux/actions/issue";
import { AddIssueModal } from "../modals/AddIssueModal";

export class Issues extends Component {
  state = {
    extend: false
  };
  componentDidMount() {
    this.props.fetchIssues(this.props.project._id, 1);
  }
  // shouldComponentUpdate(prevProps) {
  //     if(prevProps.project !== this.props.activeProject || prevProps.issues !== this.props.issues){
  //         return true;
  //     }
  // }
  // handleAddIssue = async () => {
  //     const {user, project, addIssue, fetchIssues} = this.props
  //     const data = {
  //         name: 'new issue',
  //         description: 'testing adding issue',
  //         active: 'closed',
  //         userId: user._id,
  //         userName: user.username
  //     }
  //     await addIssue(project._id, data);
  //     await fetchIssues(project._id)
  // }

  handleOpenModal = () => {
    this.setState({ extend: !this.state.extend });
  };

  handlePageChange = (e, data) => {
    this.props.fetchIssues(this.props.project._id, data.activePage);
  };

  render() {
    const { extend } = this.state;
    const { issues, user, project, addIssue, fetchIssues } = this.props;
    const { docs } = issues;
    let issuesList = null;
    if (docs) {
      issuesList = docs.map(val => {
        const issueIcon =
          val.active === "active" ? "check circle outline" : "ban";
        const issueColor = val.active === "active" ? "green" : "red";

        return (
          <Table.Row
            style={{ height: "75px", cursor: "pointer" }}
            key={val._id}
          >
            <Table.Cell collapsing>
              <NavLink
                to={{
                  pathname: `/dashboard/issues/${val._id}`,
                  issueData: val
                }}
              >
                <div>
                  <Icon color={issueColor} name={issueIcon} />
                  {val.issueName}
                  <h6 style={{ margin: "0" }}>
                    Created by {val.ownerName}{" "}
                    {moment(val.createdAt)
                      .startOf()
                      .fromNow()}
                  </h6>
                </div>
              </NavLink>
            </Table.Cell>
          </Table.Row>
        );
      });
    }

    console.log("issues totalpages:", issues);

    return (
      <div
        style={{ overflowY: "auto" }}
        className="flex flex-column flex-align-items-center"
      >
        <Message
          style={{ width: "50%", marginTop: "20px", minHeight: "110px" }}
        >
          <Message.Header>Changes in contributing</Message.Header>
          <p>
            We updated our contribute policy here to better service our
            customers. We recommend reviewing the changes.
          </p>
        </Message>
        <div className="flex flex-justify-between" style={{ width: "50%" }}>
          <Input transparent icon="search" placeholder="Search..." />
          <Button onClick={this.handleOpenModal} style={{ marginLeft: "20px" }}>
            New Issue
          </Button>
        </div>

        <Table style={{ width: "60%" }} selectable celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3">Issues</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{issuesList && issuesList}</Table.Body>
        </Table>
        {issues.totalPages > 1 ? (
          <Pagination
            onPageChange={this.handlePageChange}
            defaultActivePage={1}
            totalPages={issues.totalPages}
          />
        ) : null}

        {extend && (
          <AddIssueModal
            project={project}
            user={user}
            addIssue={addIssue}
            fetchIssues={fetchIssues}
            handleOpenModal={this.handleOpenModal}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.User.currentUser,
  project: state.Project.activeProject,
  issues: state.Issue.issues
});

export default connect(
  mapStateToProps,
  { addIssue, fetchIssues }
)(Issues);
