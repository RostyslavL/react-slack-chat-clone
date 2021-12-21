import React, { Component } from 'react'
import {Segment, Icon, Accordion, Header} from 'semantic-ui-react'

export default class MetaPanel extends Component {

    state = {
        activeIndex:0,
        privateChannel:this.props.isPrivateChannel,
    }

    setActiveIndex = (event, titleProps) => {
        const {index} = titleProps
        const {activeIndex} = this.state
        const  newIndex = activeIndex === index ? -1 : index
        this.setState({activeIndex:newIndex})
    }

    render() {

        const {activeIndex, privateChannel} = this.state

        if(privateChannel) return null
        
        return (
            <Segment>
               <Header as="h3" attached="top"> 
                    About # Channel
               </Header>
               {/* Segment 1 */}
               <Accordion styled attached="true">
                   <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={this.setActiveIndex}
                    >
                        <Icon name="dropdown"/>
                        <Icon name="info"/>
                        Channel Details
                   </Accordion.Title>
                   <Accordion.Content active={activeIndex === 0}>
                        Details
                   </Accordion.Content>
                   {/* Segment 2 */}
                   <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={this.setActiveIndex}
                    >
                        <Icon name="dropdown"/>
                        <Icon name="user circle"/>
                        Top Posters
                   </Accordion.Title>
                   <Accordion.Content active={activeIndex === 1}>
                        Posters
                   </Accordion.Content>
                   {/* Segment 3 */}
                   <Accordion.Title
                        active={activeIndex === 2}
                        index={2}
                        onClick={this.setActiveIndex}
                    >
                        <Icon name="dropdown"/>
                        <Icon name="pencil alternate"/>
                        Created By
                   </Accordion.Title>
                   <Accordion.Content active={activeIndex === 2}>
                        creator
                   </Accordion.Content>
               </Accordion>
            </Segment>
        )
    }
}
