import React, { Component } from 'react'
import { Modal, Button, Input, Icon } from 'semantic-ui-react'
import mime from 'mime-types'

export default class FileModal extends Component {

    state = {
        file:null,
        authorized:['image/jpeg','image/png','image/jpg']
    }

    isAuthorized = (filename) =>{
        this.state.authorized.includes(mime.lookup(filename))
    }

    addFile = (event) =>{
        const file = event.target.files[0]
        if(file){
            this.setState({file})
            console.log(file)
        }
    }

    clearFile = () =>{
        this.setState({file:null})
    }

    sendFile = () =>{
        const {file} = this.state
        const {uploadFile,closeModal} = this.props
        if(file !== null){
            if(this.isAuthorized(file.name)){
                const metadata = {contentType:mime.lookup(file.name)}
                uploadFile(file,metadata)
                closeModal()
            }
        }
    }

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
                        onChange={this.addFile}
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button 
                        color='green' 
                        inverted
                        onClick={this.sendFile}
                    >
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
