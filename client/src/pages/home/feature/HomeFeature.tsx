import React, { ReactElement } from "react";
import { Image } from "semantic-ui-react";

import taskImg from "../../../images/undraw/undraw_schedule_pnbk.svg";
import issueImg from "../../../images/undraw/undraw_bug_fixing_oc7a.svg";
import chatImg from "../../../images/undraw/undraw_team_chat_y27k.svg";

interface Props {}

function HomeFeature({}: Props): ReactElement {
  return (
    <div id="feature" className="home-feature-container">
      <h1 className="home-feature-title">Features</h1>
      {/* Task Feature */}
      <div className="flex flex-justify-between home-feature-card">
        <Image
          className="home-feature-image"
          style={{ width: "30%" }}
          src={taskImg}
        />
        <div
          className="flex flex-column flex-align-items-center home-feature-content"
          style={{ width: "100%" }}
        >
          <h3 className="home-feature-subtitle">Task</h3>
          <p className="home-feature-text">
            Plan and create tasks with project members to complete projects
          </p>
        </div>
      </div>
      {/* Issue Feature */}
      <div className="flex flex-row-reverse flex-justify-between home-feature-card">
        <Image
          className="home-feature-image"
          style={{ width: "30%" }}
          src={issueImg}
        />
        <div
          className="flex flex-column flex-align-items-center home-feature-content"
          style={{ width: "100%" }}
        >
          <h3 className="home-feature-subtitle">Issue</h3>
          <p className="home-feature-text">
            Find and report issues that you come across on projects
          </p>
        </div>
      </div>
      {/* Chat Feature */}
      <div className="flex flex-justify-between home-feature-card">
        <Image
          className="home-feature-image"
          style={{ width: "30%" }}
          src={chatImg}
        />
        <div
          className="flex flex-column flex-align-items-center home-feature-content"
          style={{ width: "100%" }}
        >
          <h3 className="home-feature-subtitle">Chat</h3>
          <p className="home-feature-text">
            Easily chat with project members across multiple projects
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeFeature;
