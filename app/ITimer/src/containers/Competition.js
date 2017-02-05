import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button, Icon, Header, Title } from 'native-base'

export default class Competition extends Component {
	render(){
		return(
			<View>
                <Header>
                    <Button transparent>
                        <Icon name='ios-arrow-back' />
                    </Button>
                    
                    <Title>Competition</Title>
                    
                    <Button transparent>
                        <Icon name='ios-menu' />
                    </Button>
                </Header>
				<Text>Competition</Text>				
			</View>
		)
	}
}