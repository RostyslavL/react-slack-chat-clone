import React, { Component } from 'react'
import { Sidebar, Menu, Divider, Button, Input, Modal, Label ,Icon, Segment } from 'semantic-ui-react'
import {SliderPicker, TwitterPicker , CompactPicker, CirclePicker } from 'react-color'
import firebase from '../../firebase'
import {connect} from 'react-redux'
import {setColors} from '../../actions'

class ColorPanel extends Component {

    state = {
        modal:false,
        primary:'',
        secondary:'',
        usersRef: firebase.database().ref('users'),
        user:this.props.currentUser,
        userColors:[]
    }

    componentDidMount() {
        if(this.state.user){
           this.addListener(this.state.user.uid) 
        }
    }

    addListener = (userId) => {
        let userColors = []
        this.state.usersRef
        .child(`${userId}/colors`)
        .on('child_added', snap => {
            userColors.unshift(snap.val())
            console.log(userColors);
        })
        this.setState({userColors})

    }
    
    openModal = () => {
        this.setState({modal:true})
        
    }

    closeModal = () => {
        this.setState({modal:false})
    }

    handlePrimaryChange = color => {this.setState({primary: color.hex})}

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
    
    displayUserColors = colors => (
        colors.length > 0 && colors.map((color, index) => (
            <React.Fragment key={index}>
                <Divider/>
                    <div 
                        className="color__container" 
                        onClick={() => this.props.setColors(color.primary, color.secondary)}
                    >
                    <div className="color__square" style={{background: color.primary}}>
                        <div className="color__overlay" style={{background: color.secondary}}>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        ))
    )

    render() {

        const {
            modal, 
            primary, 
            secondary,  
            userColors
        } = this.state

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
                {this.displayUserColors(userColors)}
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

export default connect(null,{setColors})(ColorPanel)