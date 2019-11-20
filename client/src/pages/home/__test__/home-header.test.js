import React from "react";
import { shallow } from "enzyme";
import HomeHeader from "../header/HomeHeader";

it("should render home page", () => {
  expect(shallow(<HomeHeader />)).toMatchSnapshot();
});
