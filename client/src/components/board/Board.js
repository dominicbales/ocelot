import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { localURL } from "../../../api";
import { Card, Grid } from "semantic-ui-react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { fetchProjectBoards } from "../../redux/actions/project";

import AddBoardModal from "./AddBoardModal";
import useModal from "../modals/useModal";

const Board = props => {
  const { activeProject, fetchProjectBoards, currentUser, boards } = props;
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    async function fetchData() {
      await fetchProjectBoards(activeProject._id);
    }

    fetchData();
  }, []);

  const handleAddNewBoardClick = async data => {
    const result = await axios.post(
      `${localURL}api/boards/project/${activeProject._id}/${currentUser._id}`,
      data
    );

    console.log("post result:", result);
  };

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
            onClick={toggle}
            // link
            className="tasks-add-board-container"
            description={"Create a New Board"}
          />
        </div>
        {isShowing ? (
          <AddBoardModal toggle={toggle} addBoard={handleAddNewBoardClick} />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  boards: state.Project.boards,
  currentUser: state.User.currentUser,
  activeProject: state.Project.activeProject
});

export default connect(
  mapStateToProps,
  { fetchProjectBoards }
)(Board);
