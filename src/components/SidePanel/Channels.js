import React, { Component } from 'react'
import firebase from '../../firebase'
import {Menu,Icon,Modal, Form, Input, Button, Label} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {setCurrentChannel, setPrivateChannel} from '../../actions/index'

class Channels extends Component {

    state = {
        user:this.props.currentUser,
        activeChannel:'',
        channels:[],
        channelName:'',
        channelDetails:'',
        channelsRef: firebase.database().ref('channels'),
        messagessRef: firebase.database().ref('messages'),
        typingRef: firebase.database().ref('typing'),
        notifications:[],
        modal:false,
        firstLoad:true,
        channel:null
    }

    componentDidMount(){
        this.addListeners()
    }
    componentWillUnmount(){
        this.removeListeners()
    }
    
    addListeners = () =>{
        let loadedChannels = []
        this.state.channelsRef.on('child_added',  snap =>{
            loadedChannels.push(snap.val())
            this.setState({channels:loadedChannels}, () => this.setFirstChannel())
            this.addNotificationListener(snap.key)
        })
    }

    addNotificationListener = channelId => {
        this.state.messagessRef.child(channelId).on('value', snap => {
            if(this.state.channel){
                this.handleNotifications(channelId, this.state.channel.id, this.state.notifications, snap)
            }
        })
    }

    handleNotifications = (channelId, currentChannelId, notifications, snap) => {
        let lastTotal = 0
        let index = notifications.findIndex(notification => notification.id === channelId)
        if(index !== -1){
            if(channelId !== currentChannelId){
                lastTotal = notifications[index].total
                if(snap.numChildren() - lastTotal > 0){
                    notifications[index].count = snap.numChildren() - lastTotal
                }
            }
            notifications[index].lastKnownTotal = snap.numChildren()
        }else{
            notifications.push({
                id:channelId,
                total: snap.numChildren(),
                lastKnownTotal: snap.numChildren(),
                count:0
            })
        }
        this.setState({notifications})
    }

    clearNotifications = () => {
        let index = this.state.notifications.findIndex(notifications => notifications.id === this.state.channel.id)
        if(index !== -1) {
            let updatedNotifications = [...this.state.notifications]
            updatedNotifications[index].total = this.state.notifications[index].lastKnownTotal
            updatedNotifications[index].count = 0
            this.setState({notifications:updatedNotifications})
        }
    }
    
    removeListeners = () =>{
        this.state.channelsRef.off()
        this.state.channels.forEach(channel => {
            this.state.messagessRef.child(channel.id).off()
        })
    }

    setFirstChannel = () =>{
        const firstChannel = this.state.channels[0]
        if(this.state.firstLoad && this.state.channels.length > 0){
            this.props.setCurrentChannel(firstChannel)
            this.setActiveChannel(firstChannel)
            this.setState({channel:firstChannel})
        }
        this.setState({ firstLoad:false})
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

    setActiveChannel = (channel) =>{
        this.setState({activeChannel: channel.id})
    }

    changeChannel = (channel) =>{
        this.setActiveChannel(channel)
        this.state.typingRef
            .child(this.state.channel.id)
            .child(this.state.user.uid)
            .remove()
        this.clearNotifications()
        this.props.setCurrentChannel(channel)
        this.props.setPrivateChannel(false)
        this.setState({channel})
    }

    isFormValid = ({channelName,channelDetails}) => channelName && channelDetails

    getNotificationsCount = (channel) => {
        let count = 0
        this.state.notifications.forEach((notification) => {
            if(notification.id === channel.id){
                count = notification.count
            }
        })
        if(count > 0) return count
    }

    displayChannels = (channels) => (
        channels.length > 0 && channels.map(channel => (
            <Menu.Item
                key={channel.id}
                onClick={() => this.changeChannel(channel)}
                name={channel.name}
                style={{opacity:0.6}}
                active={channel.id === this.state.activeChannel}
            >
                {this.getNotificationsCount(channel) && (
                    <Label color='red'>
                        {this.getNotificationsCount(channel)}
                    </Label>
                )}
            # {channel.name}
            </Menu.Item>
        ))
    )
    
    render() {

        const {channels, modal} = this.state
        return (
            <React.Fragment>
                <Menu.Menu className='menu'>
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

export default connect(null,{setCurrentChannel, setPrivateChannel})(Channels)