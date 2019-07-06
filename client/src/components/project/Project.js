import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import {Card} from 'semantic-ui-react';


export class Project extends Component {
    render() {
        return (
            <Card className='product-card-container'>
                project
                <NavLink to='/profile'>Profile</NavLink>

            </Card>
        )
    }
}

export default Project
