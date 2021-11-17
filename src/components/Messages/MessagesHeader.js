import React, { Component } from 'react'
import {Header, Segment, Icon, Input } from 'semantic-ui-react'

export default class MessagesHeader extends Component {
    render() {
        return (
            <Segment clearing style={{boxShadow: '10px 5px 20px 0px rgba(66, 68, 90, 1)'}}>
                {/* Channel Title */}
                <Header fluid='true' as='h2' floated='left' style={{margiinBottom:0}}>
                    <span>
                        Channel
                        <Icon name={'star outline'} color='black'/>
                    </span>
                    <Header.Subheader> Users</Header.Subheader>
                </Header>
                 {/* Channel Search */}
                <Header floated='right'>
                    <Input 
                        size='mini' 
                        icon='search' 
                        name='searchTerm'
                        placeholder="Search Messages"/>
                </Header>
            </Segment>
        )
    }
}
