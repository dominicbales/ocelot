import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchProject } from "../../redux/actions/project";
// Components
// import Project from "../project/Project";
import ProjectMenu from "../projectMenu/ProjectMenu";
import Userbar from "../userbar/Userbar";
import Profile from "../profile/Profile";
import Task from "../../pages/task/Task";
import Board from "../board/Board";
import Issues from "../issues/Issues";
import Issue from "../issues/Issue";
// import Chat from "../chat/Chat";
import ComingSoon from "../coming-soon/ComingSoon";
import DashHome from "../../pages/dashboard/DashHome";
import Invite from "../invite/Invite";
import RightSideBar from "../rightSideBar/RightSideBar";

interface ContentAreaProps {
  children?: React.ReactNode;
  activeProject: { name: string };
}

const ContentArea: React.FC = ({ activeProject }: ContentAreaProps) => {
  const [activeMenu, setActiveMenu] = React.useState("");

  //   shouldComponentUpdate(prevProps, prevState) {
  //     if (
  //       prevProps.activeProject !== this.props.activeProject ||
  //       prevState.activeMenu !== this.state.activeMenu
  //     ) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }

  let projectKeys: Array<string> | null = null;
  // Checks to see if their are any keys within activeProject object
  if (activeProject) {
    projectKeys = Object.keys(activeProject);
    // console.log("projectkeys:", projectKeys);
  }

  return (
    <>
      <ProjectMenu
        activeMenu={activeMenu}
        handleActiveMenu={setActiveMenu}
        name={activeProject ? activeProject.name : "No Project Selected"}
      />
      <div
        className="flex flex-column flex-1"
        // background color can be either or
        style={{
          overflowX: "auto",
          backgroundColor: "#252525",
          // backgroundColor: "#292929",
          border: "1px solid #1b1b1b"
        }}
      >
        <Userbar />
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ width: "90%" }}>
            <Switch>
              <Route path="/dashboard/profile" component={Profile} />
              {projectKeys ? (
                <>
                  <Route exact path="/dashboard/task" component={Board} />
                  <Route exact path="/dashboard/invite" component={Invite} />
                  <Route
                    exact
                    path="/dashboard/task/:boardId"
                    component={Task}
                  />
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
          <RightSideBar />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  activeProject: state.Project.activeProject
});

export default connect(
  mapStateToProps,
  { fetchProject }
)(ContentArea);
