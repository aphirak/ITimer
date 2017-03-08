import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { DefaultRenderer } from 'react-native-router-flux'
import { Container, Content, Footer, FooterTab, Button, Icon, Badge } from 'native-base'

export default class Page1 extends Component {
	render(){
		return (
            <Container>
                <Content>
				   <DefaultRenderer 
				      navigationState={this.props.children[0]} 
				      onNavigate={this.props.onNavigate} 
				   />
                </Content>
                <Footer >
                    <FooterTab>
                        <Button >
                            <Badge>2</Badge>
                            Competition
                            <Icon name='ios-apps-outline' />
                        </Button>
                        <Button >
                            Timer
                            <Icon name='ios-compass' />
                        </Button>
                        <Button>
                            User
                            <Icon name='ios-contact-outline' />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
		)
	}
}