import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button, Icon, Header, Title } from 'native-base'
import { App } from 'ITimer/src/containers'

export default class User extends Component {
	render(){
		return(
			<View>
                <Header>
                    <Button transparent>
                        <Icon name='ios-arrow-back' />
                    </Button>
                    
                    <Title>User</Title>
                    
                    <Button transparent>
                        <Icon name='ios-menu' />
                    </Button>
                </Header>
				<Text>User</Text>				
			</View>
		)
	}
}