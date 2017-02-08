import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { List, ListItem, Col, Row, Grid, Button, Text, Card, CardItem, H1, H3 } from 'native-base'
import { App } from 'ITimer/src/containers'

const styles = StyleSheet.create({
	colStyle: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	cardStyle: {
		flex: 1,
		marginTop: 10,
		marginLeft: 5,
		marginRight: 5
	},
	listStyle: {
		marginRight: 15,
	},
	buttonStyle: {
		flex: 1,
		alignSelf: 'stretch',
		backgroundColor: '#fff',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#00b8ff'
	},
	textButtonStyle: {
		alignSelf: 'center',
		color: '#00b8ff',
		fontSize: 16,
		fontWeight: '600',
	},
	headerStyle: {
		alignItems: 'center'
	}
})


export default class Timer extends Component {
	render(){
		return(
			<Card style={styles.cardStyle}>
	            <CardItem style={styles.headerStyle}>
					<H1>Time</H1>
                </CardItem>
	            <CardItem style={styles.headerStyle}>
					<H3>10.118 s</H3>
					<H3>Timing Gate: 1/2</H3>
					<H3>User ID 2</H3>
                </CardItem>
                <CardItem button style={styles.buttonStyle}>
					 <Text style={styles.textButtonStyle}>Stop</Text>
	             </CardItem>
			</Card>
		)
	}
}