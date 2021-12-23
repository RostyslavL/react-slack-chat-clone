import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import UserPanel from './UserPanel'
import Channels from './Channels'
import DirectMessages from './DirectMessages'
import Starred from './Starred'

export default class SidePanel extends Component {
    render() {

        const {currentUser, primaryColor, secondaryColor} = this.props
        return (
            <Menu 
                size="large" 
                inverted 
                fixed="left" 
                vertical 
                style={
                    {
                    //  background: 'linear-gradient('primaryColor +'27%', +'secondaryColor'+ 100%'),
                     background: primaryColor,
                     fontSize: '1.2rem',
                     boxShadow: '10px 5px 20px 0px rgba(66, 68, 90, 1)',
                     overflowY: 'scroll'
                    }
                }   
                >
                <UserPanel currentUser={currentUser} primaryColor={primaryColor}/>
                <Starred currentUser={currentUser}/>
                <Channels currentUser={currentUser}/>
                <DirectMessages currentUser={currentUser} />
            </Menu>
        )
    }
}
