import React, { Component } from 'react'
import { Sidebar, Menu, Divider, Button } from 'semantic-ui-react'

export default class ColorPanel extends Component {
    render() {
        return (
            <Sidebar
                as={Menu}
                width='very thin'
                inverted
                visible
                vertical
            >
                <Divider/>
                <Button icon='add' size='small' color='blue' />
            </Sidebar>
        )
    }
}
