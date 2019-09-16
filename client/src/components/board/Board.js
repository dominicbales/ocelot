import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { localURL } from "../../../api";
import { Card, Grid } from "semantic-ui-react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { fetchProjectBoards } from "../../redux/actions/project";

export class Board extends Component {
  async componentDidMount() {
    const { activeProject, fetchProjectBoards, currentUser } = this.props;
    console.log("active project:", activeProject);
    await fetchProjectBoards(activeProject._id);
  }
  onDataChange = event => {
    console.log("event task:", event);
  };

  handleAddNewBoardClick = async () => {
    console.log("inside on post click board");
    const { activeProject, currentUser } = this.props;

    const data = {
      boardName: "axios post test",
      description: "asfjsadflkasdglkjsdglkjsd"
    };

    const result = await axios.post(
      `${localURL}api/boards/project/${activeProject._id}/${currentUser._id}`,
      data
    );

    console.log("post result:", result);
  };

  render() {
    const { boards } = this.props;

    const boardList = boards.map(value => {
      return (
        <div
          style={{
            wordBreak: "break-all",
            paddingTop: "10px",
            width: "25%"
          }}
          key={value._id}
        >
          <Card
            as={NavLink}
            exact
            to={`/dashboard/task/${value._id}`}
            link
            header={value.boardName}
            description={value.description}
          />
        </div>
      );
    });

    return (
      <div>
        <div className="flex" style={{ flexWrap: "wrap", padding: "10px" }}>
          {boardList}
          <div
            // className="tasks-add-board-container"
            style={{
              wordBreak: "break-all",
              paddingTop: "10px",
              width: "25%"
            }}
          >
            <Card
              onClick={this.handleAddNewBoardClick}
              link
              className="tasks-add-board-container"
              description={"Create a New Board"}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  boards: state.Project.boards,
  currentUser: state.User.currentUser,
  activeProject: state.Project.activeProject
});

export default connect(
  mapStateToProps,
  { fetchProjectBoards }
)(Board);
