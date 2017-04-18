import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { FormUser } from 'components/users'
import * as actions from 'actions'

const { postUser } = actions

class AddUser extends Component {
	render () {
		return (
			<FormUser
				title='Add User'
				handleSubmit={this.props.handleSubmit}
				reset={this.props.reset}
			/>
		)
	}
}

const mapStateToProps = (state) => ({
	users: state.user.values
})

const mapDispatchToProps = (dispatch) => ({
	onSubmit (value) {
		dispatch(postUser(value))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(reduxForm({
	form: 'addUserForm'
})(AddUser))
