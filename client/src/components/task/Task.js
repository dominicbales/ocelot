import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";

export class Task extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => {
          const style = {
            backgroundColor: snapshot.isDragging ? "blue" : "white",
            fontSize: 18,
            ...provided.draggableProps.style
          };
          return (
            <div
              className="task-rows"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={style}
            >
              {this.props.task.content}
            </div>
          );
        }}
      </Draggable>
    );
  }
}

export default Task;
