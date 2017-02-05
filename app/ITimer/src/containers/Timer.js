import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { App } from 'ITimer/src/containers'

export default class Timer extends Component {
	render(){
		return(
			<App tab={this.props.tab}>
				<Text>Timer</Text>	
			</App>
		)
	}
}