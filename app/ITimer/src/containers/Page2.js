import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Page2 extends Component {

	componentWillMount(){
		console.log(this.props.uid)
	}

	render(){
		return (
			<View style={{"paddingTop": 60}}>

			</View>
		)
	}
}