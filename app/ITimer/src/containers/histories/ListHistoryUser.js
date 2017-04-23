import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardItem, Text, Body, Button, ListItem, Col, Grid, List, H2 } from 'native-base'
import moment from 'moment'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'

import { Actions } from 'react-native-router-flux'
import * as actions  from 'ITimer/src/actions'

const { getHistoriesByUserId, getUserById } = actions

const initialUser = {
	username: '',
	firstname: '',
	lastname: '',
	nickname: ''
}

const styles = {
	cardItemStyle: {
		marginRight: 15
	},
	titleText: {
		fontWeight: 'bold',
		fontSize: responsiveFontSize(2)
	}
}

class ListHistoryUser extends Component {

	componentWillMount(){
		this.props.getUserById(this.props.params.id)
		this.props.getHistoriesByUserId(this.props.params.id)
	}

	render(){
		let { firstname, lastname, nickname } = this.props.user
		return (
            <Card>
		        <CardItem header bordered style={{ justifyContent: 'center' }}>
	             	<Text>{`${firstname} ${lastname} (${nickname})`}</Text>
		        </CardItem>
                <CardItem cardBody bordered>
					<ListItem>
						<Grid>
							<Col><Text style={styles.titleText}>Time (s)</Text></Col>
							<Col><Text style={styles.titleText}>Speed (m/s)</Text></Col>
							<Col><Text style={styles.titleText}>Date</Text></Col>
						</Grid>
					</ListItem>
                </CardItem>
                <CardItem cardBody>
                    <List dataArray={this.props.histories} renderRow={(history) =>
                        <ListItem onPress={() => Actions.detailHistory({ type: 'reset', params: { details: history.details, total: { total_time: history.total_time, speed_average: history.speed_average, total_distance: history.total_distance } }})}>
		                    <Col><Text>{history.total_time}</Text></Col>
		                    <Col><Text>{history.speed_average}</Text></Col>
		                    <Col><Text>{moment(history.created_at).fromNow()}</Text></Col>
                        </ListItem>
                    } />
                </CardItem>
           </Card>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	user: state.user.value[ownProps.params.id] || { id: ownProps.params.id, ...initialUser },
	histories: state.history.valuesByUserId
})

const mapDispatchToProps = (dispatch) => ({
	getUserById(id){
		dispatch(getUserById(id))
	},
	getHistoriesByUserId(id){
		dispatch(getHistoriesByUserId(id))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListHistoryUser)