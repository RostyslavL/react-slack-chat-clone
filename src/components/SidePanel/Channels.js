import React, { Component } from 'react'
import {Menu,Icon,Modal, Form, Input, Button} from 'semantic-ui-react'

export default class Channels extends Component {

    state = {
        channels:[],
        channelName:'',
        channelDetails:'',
        modal:false
    }

    closeModal = () =>{
        this.setState({modal:false})
    }
    openModal = () =>{
        this.setState({modal:true})
    }
    triggerModal = () =>{
        this.setState({modal:!this.state.modal})
    }

    handleChange = (event) =>{
        this.setState({[event.target.name]: event.target.value})
    }

    render() {

        const {channels, modal} = this.state
        return (
            <React.Fragment>
                <Menu.Menu style={{paddingBottom: '2rem'}}>
                    <Menu.Item>
                        <span>
                            <Icon name="exchange"/> Channels
                        </span>
                        {' '}
                        ({channels.length})  <Icon name="add" onClick={this.triggerModal}/>
                    </Menu.Item>
                    {/* channels */}
                </Menu.Menu>
                {/* Add Channel modal: */}
                <Modal basic open={modal} onClose={this.closeModal}>
                    <Modal.Header>Add A Channel</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <Input 
                                   fluid
                                   label="Name of Channel"
                                   name="channelName"
                                   onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input 
                                   fluid
                                   label="Channel Details"
                                   name="channelDetails"
                                   onChange={this.handleChange}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' inverted>
                            <Icon name="checkmark"/> Add
                        </Button>
                        <Button color='red' inverted>
                            <Icon name="remove" onClick={this.triggerModal}/> Calcel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}
