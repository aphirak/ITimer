import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { FormUser } from 'ITimer/src/components/users'
import * as actions  from 'ITimer/src/actions'

const { postUser } = actions

class AddUser extends Component {
	render(){
		return (
			<FormUser
				title='Add User'
				handleSubmit={this.props.handleSubmit}
			/>
		)
	}
}

AddUser = reduxForm({
  form: 'addUserForm'
})(AddUser)

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
	onSubmit(value){
		dispatch(postUser(value))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddUser)