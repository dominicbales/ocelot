import * as React from "react";
import { Card, Button, Table } from "semantic-ui-react";

const ProjectTaskTodo: React.FC = () => {
  return (
    <Card style={{ height: "100%", width: "100%" }}>
      <Card.Content style={{ flexGrow: "unset" }}>
        <Card.Header>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Today Task</h3>
            <div>
              <Button style={{ backgroundColor: "#7bfddc" }} size="mini">
                Add to Task
              </Button>
            </div>
          </div>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ backgroundColor: "#7bfddc" }}>
                Task Name
              </Table.HeaderCell>
              <Table.HeaderCell style={{ backgroundColor: "#7bfddc" }}>
                Status
              </Table.HeaderCell>
              <Table.HeaderCell style={{ backgroundColor: "#7bfddc" }}>
                Edit
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>Google Project Review</Table.Cell>
              <Table.Cell>Completed</Table.Cell>
              <Table.Cell>jhlilk</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Code Review</Table.Cell>
              <Table.Cell>In Progress</Table.Cell>
              <Table.Cell>jamiehari</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Product Research</Table.Cell>
              <Table.Cell>Not Completed</Table.Cell>
              <Table.Cell>jilsewris</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card.Content>
      <Card.Content style={{ flexGrow: "unset" }}>
        <Card.Header>Show More</Card.Header>
      </Card.Content>
    </Card>
  );
};

export default ProjectTaskTodo;
