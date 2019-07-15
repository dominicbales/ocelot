import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
// Images
import productPic from "../../../images/landing/product2.jpg";
//<a href="https://www.freepik.com/free-photos-vectors/business">Business vector created by freepik - www.freepik.com</a>
export class HomeHeader extends Component {
  render() {
    return (
      <div
        className="flex flex-justify-center flex-align-items-center"
        style={{ height: "100%" }}
      >
        <div style={{ width: "60%", height: "60%" }} className="flex">
          <div
            className="flex flex-justify-center flex-column"
            style={{ width: "50%", padding: "12px" }}
          >
            <h1>
              Build products without the need for multiple project management
              apps
            </h1>
            <p>
              Ocelot lets you to keep track of projects issues, task and allows
              you to group chat with other developers that are on the project
            </p>
            <div>
              <NavLink to="/signup">
                <Button>Signup</Button>
              </NavLink>

              <Button>Learn more</Button>
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <img style={{ width: "400px" }} src={productPic} />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeHeader;
