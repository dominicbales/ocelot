import React from "react";
import { Card } from "semantic-ui-react";

function LaneScrollSection(props) {
  console.log("scroll props:", props);
  return <Card className="task-scroll-body">{props.children}</Card>;
}

export default LaneScrollSection;
