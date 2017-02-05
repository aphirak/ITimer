import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button, Icon, Header, Title } from 'native-base'
import { App } from 'ITimer/src/containers'

export default class Timer extends Component {
	render(){
		return(
			<View>
                <Header>
                    <Button transparent>
                        <Icon name='ios-arrow-back' />
                    </Button>
                    
                    <Title>Timer</Title>
                    
                    <Button transparent>
                        <Icon name='ios-menu' />
                    </Button>
                </Header>
				<Text>Timer</Text>				
			</View>
		)
	}
}