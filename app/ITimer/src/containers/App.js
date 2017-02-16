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
				Actions.listUser({ type: "replace" })
				break
		}
		this.setState({ footerTab: tab })
	}

	render(){
        let { title, rightNav, leftNav, leftNavIcon, rightNavIcon } = this.props.navigationState.children[0]
		return (
            <Container>
                <Header>
                    <Left>
                        {
                            (leftNav != undefined) &&
                                <Button transparent onPress={leftNav}>
                                    <Icon name={leftNavIcon} />
                                </Button>
                        }
                    </Left>
                    <Body>
                        <Title>{title}</Title>
                    </Body>
                    <Right>
                        {   
                            (rightNav != undefined) &&
                                <Button transparent onPress={rightNav}>
                                    <Icon name={rightNavIcon} />
                                </Button>
                        }
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
                            <Icon name='ios-apps-outline' />
                        </Button>
                        <Button active={this.state.footerTab == 1} onPress={this.switchTab.bind(this, 1)}>
                            <Icon name='ios-clock-outline' />
                        </Button>
                        <Button active={this.state.footerTab == 2} onPress={this.switchTab.bind(this, 2)}>
                            <Icon name='ios-contact-outline' />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
		)
	}
}