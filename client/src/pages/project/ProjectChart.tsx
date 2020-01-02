import React from "react";
import { Chart, Dataset } from "react-rainbow-components";
import { Card } from "semantic-ui-react";
interface Props {}

const containerStyles = {
  maxWidth: 600
};

const ProjectChart: React.FC<Props> = () => {
  return (
    <Card className="project-overview-cards">
      <Card.Content>
        <div
          className="rainbow-p-vertical_medium rainbow-m_auto"
          style={containerStyles}
        >
          <div className="rainbow-align-content_center">
            <Chart
              labels={["September", "October", "November", "December"]}
              type="line"
              className="rainbow-m-horizontal_xx-large rainbow-m-top_x-large"
            >
              <Dataset
                title="Project History"
                values={[23, 45, 123, 56]}
                backgroundColor="#7bfddc"
                borderColor="#1de9b6"
              />
              {/* <Dataset
                title="Dataset 2"
                values={[66, 100, 30, 156]}
                backgroundColor="#01b6f5"
                borderColor="#01b6f5"
              /> */}
            </Chart>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProjectChart;
