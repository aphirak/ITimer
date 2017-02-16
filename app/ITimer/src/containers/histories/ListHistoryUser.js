import React, { Component } from 'react'
import { Content, Text } from 'native-base'
import { connect } from 'react-redux'
import * as actions  from 'ITimer/src/actions'

const { getHistoriesByUserId, getUserById } = actions

const initialUser = {
	username: '',
	firstname: '',
	lastname: '',
	nickname: ''
}

class ListHistoryUser extends Component {

	componentWillMount(){
		this.props.getUserById(this.props.params.id)
		this.props.getHistoriesByUserId(this.props.params.id)
	}

	render(){
		return (
			<Content>
				<Text>ListHistoryUser</Text>
				<Text>{JSON.stringify(this.props.histories)}</Text>
			</Content>
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