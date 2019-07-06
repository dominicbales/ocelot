import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export class Profile extends Component {
    render() {
        return (
            <div>
                Profile
                <NavLink to='/'>Project</NavLink>
            </div>
        )
    }
}

export default Profile
