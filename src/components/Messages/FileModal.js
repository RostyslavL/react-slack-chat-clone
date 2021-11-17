import React, { Component } from 'react'
import { Modal, Button, Input, Icon } from 'semantic-ui-react'

export default class FileModal extends Component {
    render() {

        const {modal, closeModal} = this.props

        return (
            <Modal basic open={modal} onClose={closeModal}>
                <Modal.Header>Select an Image File</Modal.Header>
                <Modal.Content>
                    <Input
                        label='File types .jpg, .png'
                        name="file"
                        type='file'
                        fluid
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button 
                    color='green' 
                    inverted >
                        <Icon name='checkmark' /> Send
                    </Button>
                    <Button 
                        color='red' 
                        inverted  
                        onClick={closeModal}
                        >
                        <Icon name='remove' /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
