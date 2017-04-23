import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { FormUser } from 'components/users'
import * as actions  from 'actions'

const { getUserById, patchUserById } = actions

class EditUser extends Component {

	componentWillMount(){
		if(this.props.user == undefined) this.props.dispatch(push(`/user`))
	}

	render(){
		return (
			<FormUser
				title='Edit User'
				handleSubmit={this.props.handleSubmit}
				reset={this.props.reset}
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
	initialValues: initialValues(state, ownProps),
	user: state.user.value[ownProps.params.id]
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