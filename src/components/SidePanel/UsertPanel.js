import React from 'react'
import { Grid,Header,Icon,Dropdown } from 'semantic-ui-react'
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
            <span>Signed in as 
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
        return (
            <Grid style={{background: 'rgb(130, 71, 178)'}}>
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
                    </Grid.Row>
                    {/* User DropDown */}
                    <Header
                        inverted 
                        style={{padding: '1.2rem'}}  
                        as="h4"
                    >
                        <Dropdown 
                            trigger={<span>{this.state.user.displayName}</span>} 
                            options={this.dropdownOptions()}
                        />
                    </Header>
                </Grid.Column>
            </Grid>
        )
    }
}

export default UserPanel