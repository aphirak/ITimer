import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { App } from 'ITimer/src/containers'

export default class User extends Component {
	render(){
		return(
			<App tab={this.props.tab}>
				<Text>User</Text>
			</App>
		)
	}
}