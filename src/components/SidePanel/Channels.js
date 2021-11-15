import React, { Component } from 'react'
import firebase from '../../firebase'
import {Menu,Icon,Modal, Form, Input, Button} from 'semantic-ui-react'

export default class Channels extends Component {

    state = {
        user:this.props.currentUser,
        channels:[],
        channelName:'',
        channelDetails:'',
        channelsRef: firebase.database().ref('channels'),
        modal:false
    }

    componentDidMount(){
        this.addListeners()
    }

    addListeners = () =>{
        let loadedChannels = []
        this.state.channelsRef.on('child_added',  snap =>{
            loadedChannels.push(snap.val())
            this.setState({channels:loadedChannels})
        })
    }

    addChannel = () => {
        const {channelsRef,channelName,channelDetails,user} = this.state

        const key = channelsRef.push().key

        const newChannel = {
            id:key,
            name:channelName,
            details:channelDetails,
            createdBy:{
                name:user.displayName,
                avatar:user.photoURL
            }
        }
        channelsRef
        .child(key)
        .update(newChannel)
        .then(() => {
            this.setState({
                name:'',
                details:''                
            })
            this.closeModal()
            console.log('Channel added');
        })
        .catch(err =>{
            console.log(err)
        })
    }

    // triggerModal = () =>{
    //     this.setState({modal:!this.state.modal})
    // }
    openModal = () =>{
        this.setState({modal:true})
    }
    closeModal = () =>{
        this.setState({modal:false})
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    handleSubmit = (event) => {
        event.preventDefault()
        if(this.isFormValid(this.state)){
            this.addChannel()
        }
    }
    isFormValid = ({channelName,channelDetails}) => channelName && channelDetails

    displayChannels = (channels) => (
        channels.length > 0 && channels.map(channel => (
            <Menu.Item
                key={channel.id}
                onClick={() => console.log(channel)}
                name={channel.name}
                style={{opacity:0.6}}
            >
            # {channel.name}
            </Menu.Item>
        ))
    )
    
    render() {

        const {channels, modal} = this.state
        return (
            <React.Fragment>
                <Menu.Menu style={{padding:'2rem 0'}}>
                    <Menu.Item style={{cursor: 'pointer'}} >
                        <span onClick={this.openModal}>
                            <Icon name="exchange" /> Channels
                        </span>
                        {' '}
                        ({channels.length}) {' '}
                        <Icon name="add" onClick={this.openModal}/>
                    </Menu.Item>
                    {/* channels */}
                    {this.displayChannels(channels)}
                </Menu.Menu>
                {/* Add Channel modal: */}
                <Modal basic open={modal} onClose={this.closeModal}>
                    <Modal.Header>Add A Channel</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
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
                            <Icon name="checkmark" onClick={this.handleSubmit}/> Add
                        </Button>
                        <Button color='red' inverted>
                            <Icon name="remove" onClick={this.closeModal}/> Calcel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}
