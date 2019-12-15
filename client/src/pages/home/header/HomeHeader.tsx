import * as React from "react";
import { Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import Navbar from "../../../components/navbar/Navbar";

// Images
// import productPic from "../../../images/landing/product2.jpg";
import headerBg from "../../../images/landing/header-bg2.jpg";

const HomeHeader: React.FC = () => {
  return (
    <div
      className="flex flex-justify-center flex-align-items-center home-header-section"
      style={{
        height: "100%",
        // backgroundImage: `url(${headerBg})`
        backgroundImage: `url(${headerBg})`
      }}
    >
      <div style={{ height: "100%", width: "100%" }}>
        <Navbar />
        <div className="flex home-header-content-container">
          <div className="flex  flex-column home-header-content">
            <h1 className="home-header-title">Ocelot</h1>
            <h1 className="home-header-subtitle">
              Build products without the need for multiple apps
            </h1>
            <p className="home-header-text">
              Ocelot lets you to keep track of projects issues and tasks while
              also allowing you to chat with project members.
            </p>
            <div>
              <NavLink to="/signin">
                <Button>Sign in</Button>
              </NavLink>
              <NavLink to="/signup">
                <Button>Sign up</Button>
              </NavLink>
            </div>
          </div>
          {/* <div className="home-header-img-container">
            <img className="home-header-img" src={productPic} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
