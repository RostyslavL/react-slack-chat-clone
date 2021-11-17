import React, { Component } from 'react'
import {Segment, Comment } from 'semantic-ui-react'
import MessagesHeader from './MessagesHeader'
import MessageForm from './MessageForm'
import firebase from '../../firebase'
import Message from './Message'

export default class Messages extends Component {

    state = {
        messagesRef: firebase.database().ref('messages'),
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        messages:[],
        messagesLoading:true
    }

    componentDidMount(){
        const {channel, user} = this.state
        if(channel && user){
            this.addListeners(channel.id)
        }
    }

    addListeners = channelId => {
        this.addMessageListener(channelId);
      }

    addMessageListener = (channelId) => {
        let loadedMessages = []
        this.state.messagesRef.child(channelId).on("child_added", snap =>{
            loadedMessages.push(snap.val())
            console.log(loadedMessages)
            this.setState({
                messages: loadedMessages,
                messagesLoading: false
            })
        })
    }
    
    displayMessages = (messages) => 
        messages.length > 0 && messages.map(message => (
          <Message
            key={message.timestamp}
            message={message}
            user={this.state.user}
          />
        ))

    render() {
        
        const {messagesRef, channel, user, messages} = this.state

        return (
            <React.Fragment>
               <MessagesHeader/> 
               <Segment style={{boxShadow: '10px 5px 20px 0px rgba(66, 68, 90, 1)'}}>
                   <Comment.Group className='messages'>
                   {this.displayMessages(messages)}
                   </Comment.Group>
               </Segment>
               <MessageForm 
                    messagesRef={messagesRef}
                    currentChannel={channel}
                    currentUser={user}
               />
            </React.Fragment>
        )
    }
}
