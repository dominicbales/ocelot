import * as React from "react";
import { Card } from "semantic-ui-react";
import { Chart, Dataset } from "react-rainbow-components";

const ProjectStatus: React.FC = () => {
  const [labels] = React.useState([
    "Completed",
    "In Progress",
    "Not Completed"
  ]);
  const [dataset] = React.useState([
    {
      value: 30,
      color: "#24da69"
    },
    {
      value: 50,
      color: "#00fff9"
    },
    {
      value: 20,
      color: "#f24b4b"
    }
  ]);
  const renderDataset = () => {
    let data = [];
    let colors = [];

    dataset.forEach(d => {
      data.push(d.value);
      colors.push(d.color);
    });

    return <Dataset title="Data" values={data} backgroundColor={colors} />;
  };

  return (
    <Card style={{ height: "100%", width: "100%" }}>
      <Card.Content style={{ flexGrow: "unset" }}>
        <Card.Header>Project Status</Card.Header>
      </Card.Content>
      <Card.Content>
        <Chart
          labels={labels}
          type="doughnut"
          legendPosition="right"
          disableCurves
        >
          {renderDataset()}
        </Chart>
      </Card.Content>
    </Card>
  );
};

export default ProjectStatus;
