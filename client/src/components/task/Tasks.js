import React, { Component } from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import initData from './dummyTask';
import Column from './Column';

export class Tasks extends Component {
    state = initData;

    // onDragEnd = result => {
    //     // reorder column
    //     const {destination, source, draggableId} = result;
        
    //     // if no destination than return blank
    //     if (!destination) {
    //         return;
    //     }

    //     // basically if item was moved but dropped back in same
    //     // position, return blank
    //     if (
    //         destination.droppableId === source.droppableId &&
    //         destination.index === source.index
    //     ) {
    //         return;
    //     }

    //     const column = this.state.columns[source.droppableId]
    //     // create new array from taskIds
    //     const newTaskIds = Array.from(column.taskIds);
    //     // Remove 1 from newTaskIds
    //     newTaskIds.splice(source.index, 1);
    //     // Remove nothing but input draggableID
    //     newTaskIds.splice(destination.index, 0, draggableId);

    //     // Create new column using the old column properties
    //     // and adding new tasks ids
    //     const newColumn = {
    //         ...column,
    //         taskIds: newTaskIds
    //     }

    //     const newState = {
    //         ...this.state,
    //         columns: {
    //             ...this.state.columns,
    //             [newColumn.id]: newColumn
    //         }
    //     }

    //     this.setState(newState)
    // }
    onDragEnd = result => {
        const { destination, source, draggableId } = result;
    
        if (!destination) {
          return;
        }
    
        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return;
        }
    
        const column = this.state.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);
    
        const newColumn = {
          ...column,
          taskIds: newTaskIds,
        };
    
        const newState = {
          ...this.state,
          columns: {
            ...this.state.columns,
            [newColumn.id]: newColumn,
          },
        };
    
        this.setState(newState);
      };
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {this.state.columnOrder.map(columnId => {
                const column = this.state.columns[columnId];
                const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                return <Column key={column.id} column={column} tasks={tasks} />;
                })}
            </DragDropContext>
        )
    }
}

export default Tasks
