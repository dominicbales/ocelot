import React, { Component } from 'react';
import {Switch, Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux';
import {fetchProject} from '../../redux/actions/project'
// Components
import Project from '../project/Project';
import ProjectMenu from '../projectMenu/ProjectMenu';
import Userbar from '../userbar/Userbar';
import Profile from '../profile/Profile';
import ViewAllTasks from '../task/Tasks';
import Issues from '../issues/Issues'
import Issue from '../issues/Issue';

export class ContentArea extends Component {
    state = {
        activeMenu: ''
    }
    // componentDidMount() {
    //     console.log('active project:' , this.props.activeProject)
    // }
    shouldComponentUpdate(prevProps, prevState) {
        if((prevProps.activeProject !== this.props.activeProject) || (prevState.activeMenu !== this.state.activeMenu)){
            return true;
        } else {
            return false
        }
    }

    handleActiveMenu = (menu) => {
        this.setState({activeMenu: menu})
    }

    handleRouteChange = () => {
        const {activeMenu} = this.state
        const {activeProject} = this.props
        if(activeMenu.includes('Tasks')){
            return <ViewAllTasks />
        } else if(activeMenu.includes('Issues')){
            return <Issues activeMenu={activeMenu} activeProject={activeProject} />
        }else if(activeMenu.includes('Chat')){

        } else {
            return <Profile />
        }
    }

    render() {
        const {activeMenu} = this.state
        const {activeProject} = this.props
        // Checks to see if their are any keys within activeProject object
        const projectKeys = Object.keys(activeProject)
        return (
            <>  
            <ProjectMenu activeMenu={activeMenu} handleActiveMenu={this.handleActiveMenu} name={this.props.activeProject.name} />
            <div className='flex flex-column flex-1'>
            <Userbar />
            <Switch>
                    {projectKeys.length !== 0 && (
                        <>
                            <Route  path='/dashboard/task' component={ViewAllTasks} />
                            <Route exact  path='/dashboard/issues' component={Issues} />
                            <Route exact  path='/dashboard/issues/:id' component={Issue} />
                        </>
                    )}  
            </Switch> 
            </div>   
            </>
        )
    }
}

const mapStateToProps = state => ({
    activeProject: state.Project.activeProject
})

export default connect(mapStateToProps, {fetchProject})(ContentArea)
