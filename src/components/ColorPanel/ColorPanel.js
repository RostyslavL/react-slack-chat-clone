import React, { Component } from 'react'
import { Sidebar, Menu, Divider, Button, Input, Modal, Label ,Icon, Segment } from 'semantic-ui-react'
import {SliderPicker, TwitterPicker , CompactPicker, CirclePicker } from 'react-color'
import firebase from '../../firebase'

export default class ColorPanel extends Component {

    state = {
        modal:false,
        primary:'',
        secondary:'',
        usersRef: firebase.database().ref('users'),
        user:this.props.currentUser
    }
    
    openModal = () => {
        this.setState({modal:true})
    }

    closeModal = () => {
        this.setState({modal:false})
    }

    handlePrimaryChange = color => this.setState({primary: color.hex})

    handleSecondaryChange = color => this.setState({secondary: color.hex})

    handleSaveColor = () => {
        if(this.state.primary && this.state.secondary){
            this.saveColors(this.state.primary,this.state.secondary)
        }
    }

    saveColors = (primary,secondary) => {
        this.state.usersRef
        .child(`${this.state.user.uid}/colors`)
        .push()
        .update({primary,secondary})
        .then(() => {
            console.log('Color are Added');
            this.closeModal()
        })
        .catch(err => console.error(err))
    }

    render() {

        const {modal, primary, secondary} = this.state

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
                        <Segment inverted                        >
                            <Label content="Primary Color"/>
                                <CirclePicker 
                                    color={primary}
                                    onChange={this.handlePrimaryChange} />
                        </Segment>
                        <Segment inverted>
                            <Label content="Secondary Color"/>
                                <CirclePicker 
                                    color={secondary} 
                                    onChange={this.handleSecondaryChange}/>
                        </Segment> 
                    </Modal.Content>
                    <Modal.Actions>
                        <Button 
                            color='green' 
                            inverted
                            onClick={this.handleSaveColor}
                        >
                            <Icon name='checkmark'/> Save Colors
                        </Button>
                        <Button 
                            color='red' 
                            inverted 
                            onClick={this.closeModal}>
                            <Icon name='remove'/> Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Sidebar>
        )
    }
}
