import React, { Component } from 'react'
import { Card, CardItem, Text, Body, Button, ListItem, Col, Grid, List, H2, Left, Right, Icon } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import * as actions  from 'ITimer/src/actions'

const { getUserById } = actions

const initialUser = {
	username: '',
	firstname: '',
	lastname: '',
	nickname: ''
}

const styles = {
	titleText: {
		fontWeight: 'bold'
	}
}

class ProfileUser extends Component {

	componentWillMount(){
		this.props.getUserById(this.props.params.id)
		// this.props.rightNav(this.props.params.id)
	}

	// rightNav={() => Actions.editUser({ type: 'reset'})} rightNavIcon='md-create'

	render(){
		console.log(this.props)
		let { id, firstname, lastname, nickname, username } = this.props.user
		return (
			<Card>
		        <CardItem header bordered style={{ justifyContent: 'center' }}>
	             	<H2 style={styles.titleText}>Infomation</H2>
		        </CardItem>
                <CardItem cardBody>
					<ListItem>
						<Grid>
							<Col><Text style={styles.titleText}>User ID</Text></Col>
							<Col><Text>{id}</Text></Col>
						</Grid>
					</ListItem>
                </CardItem>
                <CardItem cardBody>
					<ListItem>
						<Grid>
							<Col><Text style={styles.titleText}>Username</Text></Col>
							<Col><Text>{username}</Text></Col>
						</Grid>
					</ListItem>
                </CardItem>
                <CardItem cardBody>
					<ListItem>
						<Grid>
							<Col><Text style={styles.titleText}>Name</Text></Col>
							<Col><Text>{`${firstname} ${lastname}`}</Text></Col>
						</Grid>
					</ListItem>
                </CardItem>
                <CardItem cardBody>
					<ListItem>
						<Grid>
							<Col><Text style={styles.titleText}>Nickname</Text></Col>
							<Col><Text>{nickname}</Text></Col>
						</Grid>
					</ListItem>
                </CardItem>
		        <CardItem>
		            <Body>
		            	<Button block danger bordered onPress={() => Actions.history({ type: 'reset', params: { id: this.props.params.id }})}>
		            		<Text>History</Text>
		            	</Button>
		            </Body>
		        </CardItem>
			</Card>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	user: state.user.value[ownProps.params.id] || { id: ownProps.params.id, ...initialUser }
})

const mapDispatchToProps = (dispatch) => ({
	getUserById(id){
		dispatch(getUserById(id))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileUser)