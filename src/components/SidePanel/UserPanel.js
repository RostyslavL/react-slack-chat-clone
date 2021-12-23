import React from 'react'
import { Grid,Header,Icon,Dropdown,Image, Modal, Input , Button} from 'semantic-ui-react'
import firebase from '../../firebase'
import AvatarEditor from 'react-avatar-editor'

class UserPanel extends React.Component {

    state = {
        user:this.props.currentUser,
        modal:false,
        previewImage:'',
        croppedImage:'',
        blob:''
    }

    componentWilRecieveProps(nextProps){
        this.setState({user: nextProps.currentUser})
    }

    openModal = () => {
        this.setState({modal:true})        
    }

    closeModal = () => {
        this.setState({modal:false})
    }

    dropdownOptions = () => [
        {
            text:
            <span>Signed in as {' '}
                <strong>{this.state.user.displayName}</strong>
            </span>,
            disabled:true,
            key:'user'
        },
        {
            text:<span onClick={this.openModal}>Change Avatar</span>,
            key:'avatar'
        },
        {
            text:<span onClick={this.handleSignOut}>Sign Out</span>,
            key:'signout'
        }
    ]
    handleSignOut = () => {
        firebase 
            .auth()
            .signOut()
            .then(() => console.log('User Signed out'))
    }

    handleChange = (event) => {
        const file = event.target.files[0]
        const reader = new FileReader()
        if(file) {
            reader.readAsDataURL(file)
            reader.addEventListener('load', () => {
                this.setState({previewImage:reader.result})
            })
        }
    }

    handlePreviewImage = () => {
        if(this.avatarEditor){
            this.avatarEditor.getImageScaledToCanvas().toBlob(blob => {
                let imageUrl = URL.createObjectURL(blob)
                this.setState({
                    croppedImage:imageUrl,
                    blob
                })
            })
        }
    }

    render() {

        const {user, modal, previewImage, croppedImage} = this.state
        const {primaryColor, secondaryColor} = this.props

        return (
            <Grid style={{background: `linear-gradient(to right, ${primaryColor} 27%, ${secondaryColor}) 100%`}}> 
                <Grid.Column>
                    <Grid.Row style={{padding: '1.2rem', margin:0}}>
                        <Header 
                            inverted 
                            floated="left" 
                            as="h2"
                            >
                            <Icon name="code"/>
                            {/* App Header */}
                            <Header.Content>
                                DevChat
                            </Header.Content>
                        </Header>
                    {/* User DropDown */}
                    <Header
                        inverted 
                        style={{padding: '1.2rem'}}  
                        as="h4"
                    >
                        <Dropdown
                            style={{padding: '1rem', marginTop:'1rem'}} 
                            trigger={
                            <span>
                                <Image src={user.photoURL} spaced="right" avatar/>
                                {user.displayName}
                            </span>
                        } 
                            options={this.dropdownOptions()}
                        />
                    </Header>
                    </Grid.Row>
                    {/* Change User Avatar */}
                    <Modal basic open={modal} onClose={this.closeModal}>
                        <Modal.Header>
                            Change Avatar
                        </Modal.Header>
                        <Modal.Content>
                            <Input 
                                fluid 
                                type="file" 
                                label="New Avatar"
                                name="previewImage"
                                onChange={this.handleChange}
                            />
                                <Grid 
                                    centered 
                                    stackable
                                    columns={2}
                                >
                                    <Grid.Row centered>
                                    <Grid.Column className="ui center aligned grid">
                                        {previewImage && (
                                            <AvatarEditor 
                                                image={previewImage}
                                                width={200}
                                                height={200}
                                                border={60}
                                                scale={1.5}
                                                ref={node => (this.avatarEditor = node)}
                                            />
                                        )}
                                    </Grid.Column>
                                    <Grid.Column>
                                        {croppedImage && (
                                            <Image 
                                                style={{ margin:'4em auto'}} 
                                                width={160} 
                                                height={160}
                                                src={croppedImage}
                                            />
                                        )}
                                    </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                        </Modal.Content>
                        <Modal.Actions>
                        {croppedImage && 
                            (
                            <Button 
                                color='green' 
                                inverted
                                onClick={this.handleSaveColor}
                                >
                                <Icon name='save'/> Change Avatar
                            </Button>
                        )}
                        <Button 
                            color='blue' 
                            inverted
                        >
                            <Icon name='image' onClick={this.handlePreviewImage}/> Preview
                        </Button>
                        <Button 
                            color='red' 
                            inverted 
                            onClick={this.closeModal}>
                            <Icon name='remove'/> Cancel
                        </Button>
                        </Modal.Actions>
                    </Modal>
                </Grid.Column>
            </Grid>
        )
    }
}

export default UserPanel