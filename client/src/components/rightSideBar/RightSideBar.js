import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { localURL } from "../../../api";
import { Card } from "semantic-ui-react";
import user from "../../redux/reducers/user";
import { setIsOnline } from "../../redux/actions/project";

const RightSideBar = ({ isOnline }) => {
  useEffect(() => {}, [isOnline]);
  const onlineList = isOnline.map(val => {
    return (
      <li key={val._id} style={{ color: "green", margin: "0" }}>
        {val.username}
      </li>
    );
  });

  return (
    <Card
      style={{
        width: "10%",
        margin: "0",
        height: "100%"
      }}
    >
      <h5 style={{ paddingLeft: "15%" }}>Online</h5>
      <ul style={{ margin: "0" }}>{onlineList}</ul>
    </Card>
  );
};

const mapStateToProps = state => ({
  isOnline: state.Project.isOnline,
  projects: state.Project.projects
});

export default connect(
  mapStateToProps,
  { setIsOnline }
)(RightSideBar);
