import React, { Component } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Board from 'react-trello'


export class Tasks extends Component {

  onDataChange = (event) => {
console.log('event task:', event)
  }

 
  render() {
    const data = {
      lanes: [
        // {
        //   id: 'lane1',
        //   title: 'Planned Tasks',
        //   label: '2/2',
        //   cards: [
        //     {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins'},
        //     {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
        //   ]
        // },
        // {
        //   id: 'lane2',
        //   title: 'Completed',
        //   label: '0/0',
        //   cards: []
        // }
      ]
    }

    return (
      <>
        <Board
        data={data}
        draggable
        id="EditableBoard1"
        onDataChange={this.onDataChange}
        // onCardDelete={onCardDelete}
        // onCardAdd={onCardAdd}
        // onCardClick={onCardClick}
        editable
        canAddLanes
  // onLaneAdd={onLaneAdd}
        />
      </>
    );
  }
}

export default Tasks;
