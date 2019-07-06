import React, { Component } from 'react'
import {Card,  Dropdown, Icon,Label, Menu} from 'semantic-ui-react';

export class Userbar extends Component {
    render() {
        return (
            <Card className='userbar-container flex-align-items-end'>
              <Icon circular name='user' />
                    {/* <Menu  floated>
                    <Label color='red' floating>
        22
      </Label>
      <Dropdown className='circular ' direction='left' item icon='wrench' simple>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Icon name='dropdown' />
            <span className='text'>New</span>
          </Dropdown.Item>
          <Dropdown.Item>Open</Dropdown.Item>
          <Dropdown.Item>
              Save... 
             
              </Dropdown.Item>
          <Dropdown.Item>Edit Permissions</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Header>Export</Dropdown.Header>
          <Dropdown.Item>Share</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu> */}
            </Card>
        )
    }
}

export default Userbar
