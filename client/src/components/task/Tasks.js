import React, { Component } from "react";
import { Card, Grid } from "semantic-ui-react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Board from "react-trello";

export class Tasks extends Component {
  onDataChange = event => {
    console.log("event task:", event);
  };

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
    };

    const boards = [
      {
        boardName: "test",
        description: "dfasdfasdfasdfasdfas",
        lanes: [
          {
            id: "lane1",
            title: "Planned Tasks",
            label: "2/2",
            cards: [
              {
                id: "Card1",
                title: "Write Blog",
                description: "Can AI make memes",
                label: "30 mins"
              },
              {
                id: "Card2",
                title: "Pay Rent",
                description: "Transfer via NEFT",
                label: "5 mins",
                metadata: { sha: "be312a1" }
              }
            ]
          },
          {
            id: "lane2",
            title: "Completed",
            label: "0/0",
            cards: []
          }
        ]
      },
      {
        boardName: "test3",
        description:
          "dfasdfasdfasdfaasdfasdfasdfasdfasdfasdfasfasdfasdfasdfasdfasdfasdfasdfasdfasfasdfasdfassdfas",
        lanes: [
          {
            id: "lane1",
            title: "Plannadsfasfdasdfed Tasks",
            label: "2/2",
            cards: [
              {
                id: "Card1",
                title: "Wrsdfasdfasdog",
                description: "Can AI make memes",
                label: "30 mins"
              },
              {
                id: "Card2",
                title: "Pasdfsaddfsa",
                description: "Transfer via NEFT",
                label: "5 mins",
                metadata: { sha: "be312a1" }
              }
            ]
          },
          {
            id: "lane2",
            title: "Completed",
            label: "0/0",
            cards: []
          }
        ]
      },
      {
        boardName: "test4",
        description: "dfasdfasdfasdfasdfas",
        lanes: [
          {
            id: "lane1",
            title: "Plannadsfasfdasdfed Tasks",
            label: "2/2",
            cards: [
              {
                id: "Card1",
                title: "Wrsdfasdfasdog",
                description: "Can AI make memes",
                label: "30 mins"
              },
              {
                id: "Card2",
                title: "Pasdfsaddfsa",
                description: "Transfer via NEFT",
                label: "5 mins",
                metadata: { sha: "be312a1" }
              }
            ]
          },
          {
            id: "lane2",
            title: "Completed",
            label: "0/0",
            cards: []
          }
        ]
      },
      {
        boardName: "test5",
        description: "dfasdfasdfasdfasdfas",
        lanes: [
          {
            id: "lane1",
            title: "Plannadsfasfdasdfed Tasks",
            label: "2/2",
            cards: [
              {
                id: "Card1",
                title: "Wrsdfasdfasdog",
                description: "Can AI make memes",
                label: "30 mins"
              },
              {
                id: "Card2",
                title: "Pasdfsaddfsa",
                description: "Transfer via NEFT",
                label: "5 mins",
                metadata: { sha: "be312a1" }
              }
            ]
          },
          {
            id: "lane2",
            title: "Completed",
            label: "0/0",
            cards: []
          }
        ]
      },
      {
        boardName: "test6",
        description: "dfasdfasdfasdfasdfas",
        lanes: [
          {
            id: "lane1",
            title: "Plannadsfasfdasdfed Tasks",
            label: "2/2",
            cards: [
              {
                id: "Card1",
                title: "Wrsdfasdfasdog",
                description: "Can AI make memes",
                label: "30 mins"
              },
              {
                id: "Card2",
                title: "Pasdfsaddfsa",
                description: "Transfer via NEFT",
                label: "5 mins",
                metadata: { sha: "be312a1" }
              }
            ]
          },
          {
            id: "lane2",
            title: "Completed",
            label: "0/0",
            cards: []
          }
        ]
      }
    ];

    const boardList = boards.map(value => {
      return (
        <Grid.Column
          style={{ wordBreak: "break-all", marginTop: "8px !important" }}
          key={value.boardName}
        >
          <Card link header={value.boardName} description={value.description} />
        </Grid.Column>
      );
    });

    return (
      <Grid style={{ padding: "3%" }}>
        <Grid.Row textAlign="center" columns={4}>
          {boardList}
          <Grid.Column>
            <Card
              // key={value.boardName}
              // link
              // header={value.boardName}
              description={"Create a New Board"}
            />
          </Grid.Column>
        </Grid.Row>
        {/* <Board
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
        />*/}
      </Grid>
    );
  }
}

export default Tasks;
