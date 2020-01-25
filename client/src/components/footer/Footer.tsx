import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";

interface Props {}

function Footer({}: Props): ReactElement {
  return (
    <div className="footer-container">
      <h1>Ocelet</h1>
      <div>
        <ul className="footer-ul">
          <li className="footer-list-item">
            <NavLink className="footer-nav-link">Feature</NavLink>
          </li>
          <li className="footer-list-item">
            <NavLink className="footer-nav-link" to="signup">
              Signup
            </NavLink>
          </li>
          <li className="footer-list-item">
            <NavLink className="footer-nav-link" to="signup">
              Signup
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;

// <Menu vertical>
// <Menu.Item
//   as={NavLink}
//   name="feature"
//   // onClick={this.handleItemClick}
// >
//   Feature
// </Menu.Item>

// <Menu.Item
//   as={NavLink}
//   to="signin"
//   name="signin"
//   // onClick={this.handleItemClick}
// >
//   Signin
// </Menu.Item>

// <Menu.Item
//   as={NavLink}
//   to="/signup"
//   name="signup"
//   // onClick={this.handleItemClick}
// >
//   Signup
// </Menu.Item>
// </Menu>
