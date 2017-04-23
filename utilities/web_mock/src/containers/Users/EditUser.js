import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reduxForm } from 'redux-form'

import { FormUser } from 'components/users'
import * as actions from 'actions'

const { getUserById, patchUserById } = actions

class EditUser extends Component {
	componentDidMount () {
		if (this.props.user === undefined) this.props.dispatch(push(`/user`))
	}

	render () {
		return (
			<FormUser
				title='Edit User'
				handleSubmit={this.props.handleSubmit}
				reset={this.props.reset}
			/>
		)
	}
}

const initialValues = (state, ownProps) => {
	if (!state.user.value.hasOwnProperty(ownProps.params.user_id)) {
		return {}
	} else {
		let { username, firstname, lastname, nickname } = state.user.value[ownProps.params.user_id]
		return {
			username,
			firstname,
			lastname,
			nickname
		}
	}
}

const mapStateToProps = (state, ownProps) => ({
	initialValues: initialValues(state, ownProps),
	user: state.user.value[ownProps.params.user_id]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSubmit (value) {
		dispatch(patchUserById(value, ownProps.params.user_id))
	},
	getUserById (id) {
		dispatch(getUserById(id))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(reduxForm({
	form: 'editUserForm'
})(EditUser))
