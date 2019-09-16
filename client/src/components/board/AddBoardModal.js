import React, { useState } from "react";
import { Form, Button, Card } from "semantic-ui-react";

function AddBoardModal({ addBoard, toggle }) {
  const [boardTitle, setBoardTitle] = useState("");
  const [boardDescription, setBoardDescription] = useState("");

  const handleOnSubmit = (event, data) => {
    const submittedData = {
      boardName: boardTitle,
      description: boardDescription
    };
    addBoard(submittedData);
    toggle();
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#1b1c1dad",
        position: "absolute",
        top: "0px",
        left: "0px"
      }}
    >
      <Card
        style={{
          position: "absolute",
          top: "30%",
          left: "40%",
          padding: "10px"
        }}
      >
        <Form onSubmit={handleOnSubmit}>
          <Form.Field required>
            <Form.Input
              name="boardTitle"
              onChange={(event, { value }) => setBoardTitle(value)}
              label="Board Title"
              placeholder="Title of Board"
            />
          </Form.Field>
          <Form.Field required>
            <Form.TextArea
              name="boardDescription"
              onChange={(event, { value }) => setBoardDescription(value)}
              label="Description"
              placeholder="Board Description"
            />
          </Form.Field>
          <Button type="submit">submit</Button>
        </Form>
      </Card>
    </div>
  );
}

export default AddBoardModal;
