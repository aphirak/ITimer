import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { FormUser } from 'ITimer/src/components/users'
import * as actions  from 'ITimer/src/actions'

const { postUser } = actions

class EditUser extends Component {
	render(){
		return (
			<FormUser
				title='Edit User'
				handleSubmit={this.props.handleSubmit}
			/>
		)
	}
}

EditUser = reduxForm({
  form: 'editUserForm'
})(EditUser)

const selector = formValueSelector('editUserForm')

const initialValues = (state, ownProps) => {
	if(!state.user.value.hasOwnProperty(ownProps.params.id)){
		return {}
	} else {
		let { username, firstname, lastname, nickname } = state.user.value[ownProps.params.id]
		return {
			username,
			firstname,
			lastname,
			nickname	
		}
	}

}

const mapStateToProps = (state, ownProps) => ({
	// initialValues: initialValues(state, ownProps),
	// user: state.user.value[ownProps.params.id]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSubmit(value){
		console.log(value, ownProps.params.id)
		dispatch(patchUserById(value, ownProps.params.id))
	},
	getUserById(id){
		dispatch(getUserById(id))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditUser)