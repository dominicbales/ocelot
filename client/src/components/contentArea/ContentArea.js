import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { fetchProject } from "../../redux/actions/project";
// Components
import Project from "../project/Project";
import ProjectMenu from "../projectMenu/ProjectMenu";
import Userbar from "../userbar/Userbar";
import Profile from "../profile/Profile";
import Task from "../../pages/task/Task";
import Board from "../board/Board";
import Issues from "../issues/Issues";
import Issue from "../issues/Issue";
import Chat from "../chat/Chat";
import ComingSoon from "../coming-soon/ComingSoon.tsx";
import DashHome from "../dashboard/DashHome";
import Invite from "../invite/Invite";

export class ContentArea extends Component {
  state = {
    activeMenu: ""
  };

  shouldComponentUpdate(prevProps, prevState) {
    if (
      prevProps.activeProject !== this.props.activeProject ||
      prevState.activeMenu !== this.state.activeMenu
    ) {
      return true;
    } else {
      return false;
    }
  }

  handleActiveMenu = menu => {
    this.setState({ activeMenu: menu });
  };

  render() {
    const { activeMenu } = this.state;
    const { activeProject } = this.props;
    let projectKeys = 0;
    // Checks to see if their are any keys within activeProject object
    if (activeProject) {
      projectKeys = Object.keys(activeProject);
    }

    return (
      <>
        <ProjectMenu
          activeMenu={activeMenu}
          handleActiveMenu={this.handleActiveMenu}
          name={activeProject ? activeProject.name : "No Project Selected"}
        />
        <div className="flex flex-column flex-1" style={{ overflowX: "auto" }}>
          <Userbar />
          <Switch>
            <Route path="/dashboard/profile" component={Profile} />
            {projectKeys.length !== 0 ? (
              <>
                <Route exact path="/dashboard/task" component={Board} />
                <Route exact path="/dashboard/invite" component={Invite} />
                <Route exact path="/dashboard/task/:boardId" component={Task} />
                <Route
                  exact
                  path="/dashboard/coming-soon"
                  component={ComingSoon}
                />
                <Route exact path="/dashboard/issues" component={Issues} />
                <Route exact path="/dashboard/issues/:id" component={Issue} />
              </>
            ) : (
              <Route exact path="/dashboard" component={DashHome} />
            )}
          </Switch>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  activeProject: state.Project.activeProject
});

export default connect(
  mapStateToProps,
  { fetchProject }
)(ContentArea);
