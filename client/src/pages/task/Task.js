import React, { useEffect, useState } from "react";
import Board from "react-trello";
import axios from "axios";

import { localURL } from "../../../api";

import CardSection from "../../components/board/CardSection";
import LaneHeader from "../../components/board/LaneHeader";
import LaneScrollSection from "../../components/board/LaneScrollSection";
import TaskCard from "../../components/board/TaskCard";

const components = {
  Card: TaskCard,
  LaneHeader: LaneHeader,
  ScrollableLane: LaneScrollSection,
  Section: CardSection
};

function Task({ match }) {
  const [data, setData] = useState({ lanes: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch boards task here
    async function fetchData() {
      const result = await axios.get(
        `${localURL}api/boards/${match.params.boardId}/lanes`
      );
      setData(result.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const onDataChange = event => {
    if (JSON.stringify(data.lanes) !== JSON.stringify(event.lanes)) {
      axios.post(`${localURL}api/boards/${match.params.boardId}`, event);
    }
  };

  // const onLaneAdd = event => {
  //   console.log("onLandAdd:", event);
  // };

  // const onCardAdd = (event, data) => {
  //   console.log("click add event:", event);
  //   console.log("click add data:", data);
  // };

  return loading ? (
    <div>loading</div>
  ) : (
    <div style={{ overflowY: "auto" }}>
      <Board
        style={{
          backgroundColor: "#252525"
        }}
        // components={components}
        data={data}
        draggable
        id="EditableBoard1"
        onDataChange={onDataChange}
        // onCardDelete={onCardDelete}
        // onCardAdd={onCardAdd}
        // onCardClick={onCardClick}
        editable
        canAddLanes
        // onLaneAdd={onLaneAdd}
      />
    </div>
  );
}

export default Task;
