import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import UserPanel from './UserPanel'
import Channels from './Channels'
import DirectMessages from './DirectMessages'
import Starred from './Starred'

export default class SidePanel extends Component {
    render() {

        const {currentUser} = this.props
        return (
            <Menu 
                size="large" 
                inverted 
                fixed="left" 
                vertical 
                style={
                    {
                     background:'linear-gradient(rgba(63,71,111,1) 27%, rgba(252,70,107,1) 100%)',
                     fontSize: '1.2rem',
                     boxShadow: '10px 5px 20px 0px rgba(66, 68, 90, 1)'
                    }
                }   
                >
                <UserPanel currentUser={currentUser}/>
                <Starred currentUser={currentUser}/>
                <Channels currentUser={currentUser}/>
                <DirectMessages currentUser={currentUser}/>
            </Menu>
        )
    }
}
