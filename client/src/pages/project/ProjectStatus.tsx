import * as React from "react";
import { Card } from "semantic-ui-react";
// import { Chart, Dataset } from "react-rainbow-components";

const ProjectStatus: React.FC = () => {
  return (
    <Card className="project-overview-cards">
      <Card.Content style={{ flexGrow: "unset" }}>
        <Card.Header className="project-overview-cards-title">
          Project Status
        </Card.Header>
      </Card.Content>
      <Card.Content></Card.Content>
    </Card>
  );
};

export default ProjectStatus;
