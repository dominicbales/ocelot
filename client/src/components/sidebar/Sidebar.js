import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Icon, Button, Card, Popup, Modal} from 'semantic-ui-react';
// Actions
import {addProjects, fetchProjects, fetchProject} from '../../redux/actions/project'
// Components
import AddProjectModal from '../modals/AddProjectModal'

export class Sidebar extends Component {
    state = {
        open: false
    }
    // shouldComponentUpdate(prevProps) {
    //     console.log('siee bar should update')
    // }
    handleOpenModal = () => {
        // const {user, fetchProjects, addProjects} = this.props;
        // addProjects(user._id)
        // fetchProjects(user._id)
        this.setState({open: !this.state.open})
    }

    handleProjectClick = (id) => {
        this.props.fetchProject(id)
    }
    render() {
        const {open} = this.state;
        const {projects} = this.props;
        const projectList = projects.map((val) => {
            return (
                <div key={val._id}>
                    {/* <Button className='sidebar-project-btn'  circular icon='plus' /> */}
                    <Popup content={val.name} trigger={<Button onClick={() => this.handleProjectClick(val._id)} className='sidebar-project-btn'  circular icon='plus' />} />
                </div>
            )
        })
        
        return (
            <div className='flex flex-column  flex-align-items-center sidebar-container' >
                <div className='flex flex-column flex-justify-center flex-align-items-center sidebar-divider'>
                    <Popup content='Add a project' trigger={<Button onClick={this.handleOpenModal}  circular icon='plus' />} />
                </div>
                {open && <AddProjectModal open={open} handleOpenModal={this.handleOpenModal} />}
                <div>
                    {projectList}      
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.User.currentUser,
    projects: state.Project.projects
})

export default connect(mapStateToProps, {addProjects, fetchProjects,fetchProject})(Sidebar)
