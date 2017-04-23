import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { FormUser } from 'components/users'
import * as actions  from 'actions'

const { postUser } = actions


class AddUser extends Component {

	componentWillMount(){

	}

	render(){
		return (
			<FormUser 
				title='Add User'
				handleSubmit={this.props.handleSubmit}
				reset={this.props.reset}
			/>
		)
	}
}

AddUser = reduxForm({
	form: 'addUserForm'
})(AddUser)

const selector = formValueSelector('addUserForm')

const mapStateToProps = (state) => ({
	users: state.user.values
})

const mapDispatchToProps = (dispatch) => ({
	onSubmit(value){
		dispatch(postUser(value))	
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddUser)