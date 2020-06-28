import React from "react";
// import { Chart, Dataset } from "react-rainbow-components";
import { Card } from "semantic-ui-react";
interface Props {}

const containerStyles = {
  maxWidth: 600,
};

const ProjectChart: React.FC<Props> = () => {
  return (
    <Card className="project-overview-cards">
      <Card.Content>
        <div
          className="rainbow-p-vertical_medium rainbow-m_auto"
          style={containerStyles}
        >
          <div className="rainbow-align-content_center"></div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProjectChart;
