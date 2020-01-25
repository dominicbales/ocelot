import * as React from "react";
// import { Button } from "semantic-ui-react";
// import { NavLink } from "react-router-dom";

import Navbar from "../../../components/navbar/Navbar";

const Svg = require("../../../images/undraw/undraw_status_update_jjgk.svg") as string;

// const Svg = require("../../../images/undraw/undraw_environmental_study_skau.svg") as string;

// Images
// import productPic from "../../../images/landing/product2.jpg";
// import headerBg from "../../../images/landing/header-bg2.jpg";

const HomeHeader: React.FC = () => {
  return (
    <div
      className="flex flex-justify-center flex-align-items-center home-header-section"
      style={{
        height: "100%"
      }}
    >
      <div style={{ height: "100%", width: "100%" }}>
        <Navbar />
        <div className="flex home-header-content-container">
          <div className="flex  flex-column home-header-content">
            <h1 className="home-header-title">
              Build products without the need for multiple apps
            </h1>
            <p className="home-header-text">
              Ocelot lets you to keep track of projects issues and tasks while
              also allowing you to chat with project members.
            </p>
            {/* <div>
              <NavLink to="/signin">
                <Button>Sign in</Button>
              </NavLink>
              <NavLink to="/signup">
                <Button>Sign up</Button>
              </NavLink>
            </div> */}
          </div>
          <img
            className="home-header-image"
            style={{ paddingLeft: "14px" }}
            src={Svg}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
