import * as React from "react";
import { Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

// Images
import productPic from "../../../images/landing/product2.jpg";

const HomeHeader: React.FC = () => {
  return (
    <div
      className="flex flex-justify-center flex-align-items-center home-header-section"
      style={{ height: "95%" }}
    >
      <div className="flex home-header-content-container">
        <div className="flex flex-justify-center flex-column home-header-content">
          <h1>Build products without the need for multiple apps</h1>
          <p>
            Ocelot lets you to keep track of projects issues, task and allows
            you to group chat with other developers that are on the project
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
        <div className="home-header-img-container">
          <img className="home-header-img" src={productPic} />
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
