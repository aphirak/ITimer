import React, { Component } from 'react'
import { Card, CardItem, Text, Body, Button, ListItem, Col, Grid, List } from 'native-base'
import { connect } from 'react-redux'
import * as actions from 'ITimer/src/actions'

const { getCompetitions, resetCompetitions } = actions

const styles = {
	cardItemStyle: {
		marginRight: 15
	},
	titleText: {
		fontWeight: 'bold'
	}
}

class Competition extends Component {

	componentWillMount(){
		this.props.getCompetitions()
	}

	render(){
		let competitions = [...this.props.competition.data].sort((a, b) => (a.total_time - b.total_time))
		return(
	            <Card>
	                <CardItem cardBody bordered>
						<ListItem>
							<Grid>
								<Col><Text style={styles.titleText}>User ID</Text></Col>
								<Col><Text style={styles.titleText}>Distance</Text></Col>
								<Col><Text style={styles.titleText}>Time</Text></Col>
							</Grid>
						</ListItem>
	                </CardItem>
	                <CardItem cardBody>
	                    <List dataArray={competitions} renderRow={(competition) =>
	                        <ListItem>
			                    <Col><Text>{competition.uid}</Text></Col>
			                    <Col><Text>{competition.total_distance} m</Text></Col>
			                    <Col><Text>{competition.total_time} s</Text></Col>
	                        </ListItem>
	                    } />
	                </CardItem>
	                <CardItem>
		                <Body>
		                	<Button block danger bordered onPress={this.props.resetCompetitions}>
		                		<Text>Reset</Text>
		                	</Button>
		                </Body>
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