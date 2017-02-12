import React, { Component } from 'react'
import { Actions, DefaultRenderer } from 'react-native-router-flux'
import { Container, Header, Title, Button, Left, Right, Body, Icon, Content, Footer, FooterTab, Text } from 'native-base'

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
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.props.navigationState.children[0].title}</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu' onPress={this.props.navigationState.children[0].aaa}/>
                        </Button>
                    </Right>
                </Header>
                <Content padder>
				   <DefaultRenderer 
						navigationState={this.props.navigationState.children[0]} 
						onNavigate={this.props.onNavigate} 
				   />
                </Content>
                <Footer>
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