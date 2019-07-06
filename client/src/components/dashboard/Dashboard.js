import React, { Component } from 'react';
import {connect} from 'react-redux'
// Actions
import {fetchProjects} from '../../redux/actions/project'
// Components
import Sidebar from '../sidebar/Sidebar';
import ContentArea from '../contentArea/ContentArea';

export class Dashboard extends Component {
    state = {
    }

    async componentDidMount() {
        const {user, fetchProjects} = this.props;
        fetchProjects(user._id)
    }
  
    render() {

        return (
            <div className='app-container'>
                <Sidebar />        
                <ContentArea />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.User.currentUser
})

export default connect(mapStateToProps, {fetchProjects})(Dashboard)
