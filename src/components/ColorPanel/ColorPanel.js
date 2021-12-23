import React, { Component } from 'react'
import { Sidebar, Menu, Divider, Button, Input, Modal, Label ,Icon } from 'semantic-ui-react'
import {SliderPicker, TwitterPicker , CompactPicker, CirclePicker } from 'react-color'

export default class ColorPanel extends Component {

    state = {
        modal:false,
    }
    
    openModal = () => {
        this.setState({modal:true})
    }

    closeModal = () => {
        this.setState({modal:false})
    }

    render() {

        const {modal} = this.state

        return (
            <Sidebar
                as={Menu}
                width='very thin'
                inverted
                visible
                vertical
            >
                <Divider/>
                <Button 
                    icon='add' 
                    size='small' 
                    color='blue'
                    onClick={this.openModal} 
                />
                {/* Color Picker Modal */}
                <Modal 
                    basic 
                    open={modal} 
                    onClose={this.closeModal}
                >
                    <Modal.Header>
                        Choose App Colors
                    </Modal.Header>
                    <Modal.Content>
                        <Label content="Primary Color"/>
                            <CirclePicker />
                        <Label content="Secondary Color"/>
                            <CirclePicker />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' inverted>
                            <Icon name='checkmark'/> Save Colors
                        </Button>
                        <Button color='red' inverted onClick={this.closeModal}>
                            <Icon name='remove'/> Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Sidebar>
        )
    }
}
