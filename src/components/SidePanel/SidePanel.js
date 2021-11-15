import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import UserPanel from './UsertPanel'

export default class SidePanel extends Component {
    render() {

        const {currentUser} = this.props
        return (
            <Menu 
                size="large" 
                inverted 
                fixed="left" 
                vertical 
                style={{background: 'rgb(130, 71, 178)', fontSize: '1.2rem'}}
            >
                <UserPanel currentUser={currentUser}/>
            </Menu>
        )
    }
}
