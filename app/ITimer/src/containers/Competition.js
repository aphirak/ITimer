import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { List, ListItem, Col, Row, Grid, Button, Text, Card, CardItem } from 'native-base'
import { connect } from 'react-redux'
import * as actions from 'ITimer/src/actions'

const { getCompetitions, resetCompetitions } = actions

const styles = {
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
		borderColor: '#FC3C5F'
	},
	textButtonStyle: {
		alignSelf: 'center',
		color: '#FC3C5F',
		fontSize: 16,
		fontWeight: '600',
	}
}

class Competition extends Component {

	componentWillMount(){
		this.props.getCompetitions()
	}

	render(){
		let competitions = [...this.props.competition.data].sort((a, b) => (a.total_time - b.total_time))
		return(
			<Card style={styles.cardStyle}>
	            <CardItem>
		            	<ListItem>
			                <Grid>
			                    <Col style={styles.colStyle}><Text>Time</Text></Col>
			                    <Col style={styles.colStyle}><Text>Distance</Text></Col>
			                    <Col style={styles.colStyle}><Text>Name</Text></Col>
			                </Grid>
		                </ListItem>
						{
							competitions.map((competition, index) => {
			                    return(
			                    	<ListItem key={index}>
						                <Grid>
						                    <Col style={styles.colStyle}><Text>{competition.total_time}</Text></Col>
						                    <Col style={styles.colStyle}><Text>{competition.total_distance}</Text></Col>
						                    <Col style={styles.colStyle}><Text>{competition.uid}</Text></Col>
						                </Grid>
				                    </ListItem>
				                )
							})
						}
                </CardItem>
                <CardItem button style={styles.buttonStyle} onPress={this.props.resetCompetitions}>
					 <Text style={styles.textButtonStyle}>Reset</Text>
	             </CardItem>
			</Card>
		)
	}
}

const mapStateToProps = (state) => ({
	competition: state.competition
})

const mapDispatchToProps = (dispatch) => ({
	getCompetitions(){
		dispatch(getCompetitions())
	},
	resetCompetitions(){
		dispatch(resetCompetitions())
	}
})

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Competition)