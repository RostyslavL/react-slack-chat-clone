import React from 'react'
import { Grid,Header,Icon,Dropdown } from 'semantic-ui-react'

class UserPanel extends React.Component {

    dropdownOptions = () => [
        {
            text:<span>Signed in as <strong>User</strong></span>,
            disabled:true,
            key:'user'
        },
        {
            text:<span>Change Avatar</span>,
            key:'avatar'
        },
        {
            text:<span>Sign Out</span>,
            key:'signout'
        }
    ]

    render() {
        return (
            <Grid style={{background: '#4c3c4c'}}>
                <Grid.Column>
                    <Grid.Row style={{padding: '1.2rem', margin:0}}>
                        <Header inverterd floated="left" as="h2">
                            <Icon name="code"/>
                            {/* App Header */}
                            <Header.Content>
                                DevChat
                            </Header.Content>
                        </Header>
                    </Grid.Row>
                    {/* User DropDown */}
                    <Header style={{padding: '1.2rem'}} inverterdas="h4">
                        <Dropdown trigger={
                            <span>User</span>
                        } options={this.dropdownOptions()}/>
                    </Header>
                </Grid.Column>
            </Grid>
        )
    }
}
export default UserPanel