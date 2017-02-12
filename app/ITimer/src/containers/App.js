import React, { Component } from 'react'
import { View } from 'react-native'
import { Actions, DefaultRenderer } from 'react-native-router-flux'
import { Header, Title, Container, Content, Footer, FooterTab, Button, Icon, Badge, Text } from 'native-base'

export default class App extends Component {

	state = {
		footerTab: 0
	}

	switchTab(tab){
		switch(tab){
			case 0:
				Actions.competition({ type: "replace", direction: 'horizontal' })
				break
			case 1:
				Actions.timer({ type: "replace" })
				break
			case 2:
				Actions.user({ type: "replace" })
				break
		}
		this.setState({ footerTab: tab })
	}

	render(){
		return (
            <Container>
                <Header>
                    <Button transparent>
                        <Icon name='ios-arrow-back' />
                    </Button>
                    <Title>{this.props.navigationState.children[0].title}</Title>
                    <Button transparent onPress={this.props.navigationState.children[0].aaa}>
                        <Icon name='ios-menu' />
                    </Button>
                </Header>
                <Content>
				   <DefaultRenderer 
						navigationState={this.props.navigationState.children[0]} 
						onNavigate={this.props.onNavigate} 
				   />
                </Content>
                <Footer >
                    <FooterTab>
                        <Button active={this.state.footerTab == 0} onPress={this.switchTab.bind(this, 0)}>
                            <Text>Competition</Text>
                            <Icon name='ios-apps-outline' />
                        </Button>
                        <Button active={this.state.footerTab == 1} onPress={this.switchTab.bind(this, 1)}>
                            <Text>Timer</Text>
                            <Icon name='ios-clock-outline' />
                        </Button>
                        <Button active={this.state.footerTab == 2} onPress={this.switchTab.bind(this, 2)}>
                            <Text>User</Text>
                            <Icon name='ios-contact-outline' />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
		)
	}
}