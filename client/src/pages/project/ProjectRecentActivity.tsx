import * as React from "react";
import { Card, Feed } from "semantic-ui-react";
// Placeholder Images
import Jenny from "../../images/jenny.jpg";
import Molly from "../../images/molly.png";
import Elliot from "../../images/elliot.jpg";

const ProjectRecentActivity: React.FC = () => {
  return (
    <Card style={{ height: "100%", width: "100%" }}>
      <Card.Content className="project-recent-header-content">
        <Card.Header>Recent Activity</Card.Header>
      </Card.Content>
      <Card.Content>
        <Feed>
          <Feed.Event>
            <Feed.Label image={Jenny} />
            <Feed.Content>
              <Feed.Date content="1 day ago" />
              <Feed.Summary>UI Product Design</Feed.Summary>
            </Feed.Content>
          </Feed.Event>

          <Feed.Event>
            <Feed.Label image={Molly} />
            <Feed.Content>
              <Feed.Date content="3 days ago" />
              <Feed.Summary>Team Meeting</Feed.Summary>
            </Feed.Content>
          </Feed.Event>

          <Feed.Event>
            <Feed.Label image={Elliot} />
            <Feed.Content>
              <Feed.Date content="4 days ago" />
              <Feed.Summary>Product Delivery</Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Card.Content>
    </Card>
  );
};

export default ProjectRecentActivity;
