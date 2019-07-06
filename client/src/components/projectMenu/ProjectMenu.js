import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux'
import { Menu, Icon } from 'semantic-ui-react'
import {signout} from '../../redux/actions/user'

export class ProjectMenu extends Component {
    state = {}
    handleItemClick = (event, value) => {

      switch(value.name) {
        case 'Signout':
          this.props.signout();
          break;
        default:
          return;
      }
      this.setState({ activeItem: name })
    }
    render() {
      console.log('projectMenu render')
        const { activeMenu } = this.props
        return (
            <div style={{minWidth: '150px'}}>
              <Menu className='productmenu-style' vertical>
                <Menu.Item>
                  <Menu.Header>Overview</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item
                      name={this.props.name ? this.props.name : 'ProjectN'}
                      active={activeMenu === 'projectName'}
                      onClick={() => this.props.handleActiveMenu('projectName')}
                    />
                    <Menu.Item
                      name='Send Invite'
                      active={activeMenu === 'Send Invite'}
                      onClick={() => this.props.handleActiveMenu('Send Invite')}
                    />
                  </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                  <Menu.Header className='flex flex-justify-between'>
                    Chat
                    <Icon name='add circle' />
                  </Menu.Header>
                  <Menu.Menu>
                    <Menu.Item
                    // as={NavLink}
                    // to='/chat'
                      name='chat1'
                      active={activeMenu === 'chat1'}
                      onClick={() => this.props.handleActiveMenu('chat1')}
                    />
                    <Menu.Item
                      name='chat2'
                      active={activeMenu === 'chat2'}
                      onClick={() => this.props.handleActiveMenu('chat2')}
                    />
                  </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                  <Menu.Header>Task</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item
                    as={NavLink}
                    to='/dashboard/task'
                      name='View All Tasks'
                      active={activeMenu === 'View All Tasks'}
                      onClick={() => this.props.handleActiveMenu('View All Tasks')}
                    />
                    <Menu.Item
                      name='Assigned Tasks'
                      active={activeMenu === 'Assigned Tasks'}
                      onClick={() => this.props.handleActiveMenu('Assigned Tasks')}
                    />
                    <Menu.Item
                      name='Active Tasks'
                      active={activeMenu === 'Active Tasks'}
                      onClick={() => this.props.handleActiveMenu('Active Tasks')}
                    />
                    <Menu.Item
                      name='Closed Tasks'
                      active={activeMenu === 'Closed Tasks'}
                      onClick={() => this.props.handleActiveMenu('Closed Tasks')}
                    />
                  </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                  <Menu.Header>Issues</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item
                    as={NavLink}
                    to='/dashboard/issues'
                      name='View All Issues'
                      active={activeMenu === 'View All Issues'}
                      onClick={() => this.props.handleActiveMenu('View All Issues')}
                    />
                    <Menu.Item
                      name='Active Issues'
                      active={activeMenu === 'Active Issues'}
                      onClick={() => this.props.handleActiveMenu('Active Issues')}
                    />
                    <Menu.Item
                      name='Closed Issues'
                      active={activeMenu === 'Closed Issues'}
                      onClick={() => this.props.handleActiveMenu('Closed Issues')}
                    />
                  </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                  <Menu.Header>Setting</Menu.Header>
                  <Menu.Menu>
                    <Menu.Item 
                      name='Setting' 
                      active={activeMenu === 'Setting'} 
                      onClick={() => this.props.handleActiveMenu('Setting')}>
                      Support
                    </Menu.Item>
                    <Menu.Item 
                      name='Signout' 
                      active={activeMenu === 'Signout'} 
                      onClick={this.handleItemClick}>
                      Signout
                    </Menu.Item>
                  </Menu.Menu>
                </Menu.Item>
              </Menu>
            </div>
        )
    }
}

export default connect(null,{signout})(ProjectMenu)
