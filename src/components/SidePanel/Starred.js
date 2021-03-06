import React, { Component } from 'react'
import {Menu,Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {setCurrentChannel,setPrivateChannel} from '../../actions'
import firebase from '../../firebase'

class Starred extends Component {

    state = {
        user: this.props.currentUser,
        usersRef: firebase.database().ref('users'),
        starredChannels:[],
        activeChannel:''
    }

    componentDidMount() {
        if(this.state.user){
            this.addListeners(this.state.user.uid)
        }
    }

    componentWillUnmount(){
        this.removeListener()
    }

    addListeners = (userId) => {
        this.state.usersRef
            .child(userId)
            .child('starred')
            .on('child_added', snap => {
                const starredChannel = {
                    id: snap.key,
                    ...snap.val()
                }
                this.setState({
                    starredChannels:[...this.state.starredChannels, starredChannel]
                })
            })
        this.state.usersRef
            .child(userId)
            .child('starred')
            .on('child_removed', snap => {
                const channelToRemove = {
                    id: snap.key,
                    ...snap.val()
                }
                const filteredChannels = this.state.starredChannels.filter(channel => {
                    return channel.id !== channelToRemove.id
                })
                this.setState({starredChannels: filteredChannels})
            })
    }

    removeListener = () => {
        this.state.usersRef.child(`${this.state.user.uid}/starred`).off()
    }

    setActiveChannel = (channel) =>{
        this.setState({activeChannel: channel.id})
    }
    
    changeChannel = (channel) =>{
        this.setActiveChannel(channel)
        this.props.setCurrentChannel(channel)
        this.props.setPrivateChannel(false)
    }

    displayChannels = (starredChannels) => (
        starredChannels.length > 0 && starredChannels.map(channel => (
            <Menu.Item
                key={channel.id}
                onClick={() => this.changeChannel(channel)}
                name={channel.name}
                style={{opacity:0.6}}
                active={channel.id === this.state.activeChannel}
            >
            # {channel.name}
            </Menu.Item>
        ))
    )

    render() {
        const {starredChannels} = this.state
        return (
            <Menu.Menu className='menu'>
                    <Menu.Item style={{cursor: 'pointer'}} >
                        <span onClick={this.openModal}>
                            <Icon name="star" /> Starred
                        </span>
                        {' '}
                        ({starredChannels.length}) {' '}                       
                    </Menu.Item>
                    {/* starredChannels */}
                    {this.displayChannels(starredChannels)}
            </Menu.Menu>
        )
    }
}
export default connect(null, {setCurrentChannel,setPrivateChannel})(Starred)