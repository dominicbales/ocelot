import React, { Component } from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

export class Column extends Component {
  render() {
    return (
      <div
        style={{
          margin: "8px",
          border: "1px solid grey",
          borderRadius: "2px",
          padding: "8px",
          width: "25%"
        }}
      >
        <h3>{this.props.column.title}</h3>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                minHeight: "100px",
                backgroundColor: snapshot.isDraggingOver ? "orange" : "white",
                transition: "background-color 0.3s ease"
              }}
            >
              {this.props.tasks.map((task, index) => {
                return <Task key={task.id} task={task} index={index} />;
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

export default Column;
