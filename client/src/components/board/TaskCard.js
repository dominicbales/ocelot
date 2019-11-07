import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";

function TaskCard(props) {
  console.log("card props:", props);
  return (
    <Card color="red" className="task-card-style">
      {props.image ? (
        <Image
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
          wrapped
          ui={false}
        />
      ) : null}

      <Card.Content onClick={() => props.onClick()}>
        <Card.Header>{props.title}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="user" />
          22 Friends
        </a>
      </Card.Content>
    </Card>
  );
}

export default TaskCard;
