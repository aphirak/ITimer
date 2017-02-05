import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, TextInput } from 'react-native'
import axios from 'axios'
import { Container, Content, Footer, FooterTab, Button, Icon, Badge } from 'native-base'
import { Actions } from 'react-native-router-flux'
import * as actions from 'ITimer/src/actions'

const { testAction } = actions

class App extends Component {

	state = {
		footerTab: 0
	}

	componentWillMount(){
		this.setState({ footerTab: this.props.tab || 0 })
	}

	switchFooterTab(tab){
		switch (tab){
			case 0:
				Actions.competition({ type: 'replace', tab })
				break
			case 1:
				Actions.timer({ type: 'replace', tab })
				break
			case 2:
				Actions.user({ type: 'replace', tab })
				break
		}
	}

	render(){
		return (
            <Container>
                <Content>
                	{this.props.children}
                </Content>
                <Footer >
                    <FooterTab>
                        <Button active={this.state.footerTab == 0} onPress={this.switchFooterTab.bind(this, 0)}>
                            <Badge>2</Badge>
                            Competition
                            <Icon name='ios-apps-outline' />
                        </Button>
                        <Button active={this.state.footerTab == 1} onPress={this.switchFooterTab.bind(this, 1)}>
                            Timer
                            <Icon name='ios-compass' />
                        </Button>
                        <Button active={this.state.footerTab == 2} onPress={this.switchFooterTab.bind(this, 2)}>
                            User
                            <Icon name='ios-contact-outline' />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
		)
	}
}

const mapStateToProps = (state) => ({
	test: state.test.value
})

const mapDispatchToProps = (dispatch) => ({
	testAction(text){
		dispatch(testAction(text))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)

