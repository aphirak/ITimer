import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, CardItem, Text, Body, Button, ListItem, Col, Grid, List, Icon } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import * as actions  from 'ITimer/src/actions'

const { getUsers } = actions

const styles = {
	titleText: {
		fontWeight: 'bold'
	}
}

class ListUser extends Component {

	componentWillMount(){
		this.props.getUsers()
	}

	render(){
		return(
	            <Card>
	                <CardItem cardBody bordered>
						<ListItem>
							<Grid>
								<Col><Text style={styles.titleText}>User ID</Text></Col>
								<Col><Text style={styles.titleText}>Nickname</Text></Col>
								<Col><Text style={styles.titleText}>Option</Text></Col>
							</Grid>
						</ListItem>
	                </CardItem>
	                <CardItem cardBody>
	                    <List dataArray={this.props.users} renderRow={(user) =>
	                        <ListItem>
								<Grid>
				                    <Col><Text>{user.id}</Text></Col>
				                    <Col><Text>{user.nickname}</Text></Col>
				                    <Col>
				                    	<Button bordered small style={{ alignSelf: 'center' }} onPress={() => Actions.profileUser({ type: "replace", params: { id: user.id } })}>
				                    		<Icon name='ios-arrow-dropright' />
				                    	</Button>
				                    </Col>
								</Grid>
	                        </ListItem>
	                    } />
	                </CardItem>
	           </Card>
		)
	}
}

const mapStateToProps = (state) => ({
	users: state.user.values
})

const mapDispatchToProps = (dispatch) => ({
	getUsers(){
		dispatch(getUsers())
	}
})

export default connect (
	mapStateToProps,
	mapDispatchToProps
)(ListUser)