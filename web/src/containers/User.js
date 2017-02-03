import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions  from 'actions'

const { getUsers } = actions


class User extends Component {

	componentWillMount(){
		this.props.getUsers()
	}

	render(){
		return (
			<div className="has-text-centered">
				<div className="heading">
					<h1 className="title">
						<div className="columns is-gapless">
						  <div className="column is-1" />
						  <div className="column">
						    <strong>User</strong>
						  </div>
						  <div className="column is-1">
							  <div className="button is-info">ADD</div>
						  </div>
						</div>
					</h1>
				</div>
				<hr />
				<div className="content">
					<table className="table is-striped is-fullwidth">
						<thead>
						  <tr>
						    <th>#</th>
						    <th>Username</th>
						    <th>Firstname</th>
						    <th>Lastname</th>
						    <th>Nickname</th>
						    <th>Option</th>
						  </tr>
						</thead>
						<tbody>
							{
								this.props.users.map((user, index) => {
									return (
								      <tr key={index}>
								        <td>{index+1}</td>
								        <td>{user.username}</td>
								        <td>{user.firstname}</td>
								        <td>{user.lastname}</td>
								        <td>{user.nickname}</td>
								        <td>
										  <div className="button is-primary">EDIT</div>
										  {' '}
										  <div className="button is-danger">DELETE</div>
								        </td>
								      </tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
			</div>
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(User)