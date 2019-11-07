import React from "react";

function CardSection(props) {
  console.log("sections props:", props);
  return <div className="task-lane-section">{props.children}</div>;
}

export default CardSection;
