import React from 'react'
import { Grid,Header,Icon,Dropdown,Image } from 'semantic-ui-react'
import firebase from '../../firebase'

class UserPanel extends React.Component {

    state = {
        user:this.props.currentUser
    }

    componentWilRecieveProps(nextProps){
        this.setState({user: nextProps.currentUser})
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
            text:<span>Change Avatar</span>,
            key:'avatar'
        },
        {
            text:<span onClick={this.handleSignOut}>Sign Out</span>,
            key:'signout'
        }
    ]
    handleSignOut = () =>{
        firebase 
            .auth()
            .signOut()
            .then(() => console.log('User Signed out'))
    }
    render() {

        const {user} = this.state
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
                </Grid.Column>
            </Grid>
        )
    }
}

export default UserPanel