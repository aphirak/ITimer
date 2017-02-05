import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Page2 extends Component {

	componentWillMount(){
		console.log('aaa')
	}

	render(){
		return (
			<View style={{"backgroundColor" : "blue", "paddingTop": 10}}>
				<Text>Page2</Text>
			</View>
		)
	}
}