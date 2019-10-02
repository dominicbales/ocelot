import React, { Component } from "react";
import { Image } from "semantic-ui-react";
// image
import landingPic from "../../../images/landing/landingpic1.png";

export class HomeContent extends Component {
  render() {
    return (
      <div
        className="flex flex-align-items-center flex-column"
        style={{ height: "100%" }}
      >
        <div className="home-content-img-container">
          <Image src={landingPic} />
        </div>
        <div
          className="flex home-content-list-container"
          style={{
            justifyContent: "space-around",
            width: "60%",
            marginTop: "60px"
          }}
        >
          <div className="flex flex-column flex-justify-center flex-align-items-center home-content-list-item">
            <div
              className="flex flex-justify-center flex-align-items-center"
              style={{
                backgroundColor: "#66b6dc",
                borderRadius: "50%",
                width: "70px",
                height: "70px",
                color: "white"
              }}
            >
              1
            </div>
            <h3 className="home-content-list-h3">Task</h3>
            <p className="home-content-list-p">
              Create and structure project task
            </p>
          </div>
          <div className="flex flex-column flex-justify-center flex-align-items-center home-content-list-item">
            <div
              className="flex flex-justify-center flex-align-items-center"
              style={{
                backgroundColor: "#27d891",
                borderRadius: "50%",
                width: "70px",
                height: "70px",
                color: "white"
              }}
            >
              2
            </div>
            <h3 className="home-content-list-h3">Issue</h3>
            <p className="home-content-list-p">Keep track of projects issues</p>
          </div>
          <div className="flex flex-column flex-justify-center flex-align-items-center home-content-list-item">
            <div
              className="flex flex-justify-center flex-align-items-center"
              style={{
                backgroundColor: "#18e7ca",
                borderRadius: "50%",
                width: "70px",
                height: "70px",
                color: "white"
              }}
            >
              3
            </div>
            <h3 className="home-content-list-h3">Chat</h3>
            <p className="home-content-list-p">
              Create chatrooms for your project
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeContent;
