import * as React from "react";
import RGL from "react-grid-layout";

// Components
import ProjectChart from "./ProjectChart";
import ProjectStatus from "./ProjectStatus";
import ProjectTaskTodo from "./ProjectTaskTodo";
import ProjectRecentActivity from "./ProjectRecentActivity";

const Project: React.FC = () => {
  var layout = [
    { i: "a", x: 0, y: 0, w: 3, h: 8 },
    { i: "b", x: 3, y: 0, w: 6, h: 8 },
    { i: "c", x: 12, y: 0, w: 3, h: 8 },
    { i: "d", x: 0, y: 9, w: 6, h: 8 }
  ];
  return (
    <>
      <h1>Project Name</h1>
      <RGL
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <div key="a">
          <ProjectStatus />
        </div>
        <div key="b">
          <ProjectTaskTodo />
        </div>
        <div key="c">
          <ProjectRecentActivity />
        </div>
        <div key="d">
          <ProjectChart />
        </div>
      </RGL>
    </>
  );
};

export default Project;
