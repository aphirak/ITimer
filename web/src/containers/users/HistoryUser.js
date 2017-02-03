import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as actions  from 'actions'

const { getUserById } = actions

const initialUser = {
	username: '',
	firstname: '',
	lastname: '',
	nickname: ''
}

class HistoryUser extends Component {

	componentWillMount(){
		this.props.getUserById(this.props.params.id)
	}

	render(){
		let { id, username, firstname, lastname, nickname } = this.props.user
		return (
			<div className="has-text-centered">
				<div className="heading">
					<h1 className="title">
						<div className="columns is-gapless">
						  <div className="column is-1" />
						  <div className="column">
						    <strong>History</strong>
						  </div>
						  <div className="column is-1">
							  <Link to='/user/add'><button className="button is-danger">History</button></Link>
						  </div>
						</div>
					</h1>
				</div>
				<hr />
				<div className="content">
					<div className="card">
					  <header className="card-header">
					    <p className="card-header-title" style={{ "justifyContent": "center", 'alignItems': 'center' }}>
					      Infomation
					    </p>
					  </header>
					  <div className="card-content">
					    <div className="content">
							<div className="columns">
								<div className="column is-4" />
								<div className="column">
									<strong>Username : </strong>
								</div>
								<div className="column">
									{username}
								</div>
								<div className="column is-4" />
							</div>
							<div className="columns">
								<div className="column is-4" />
								<div className="column is-2">
									<strong>Name : </strong>
								</div>
								<div className="column is-3">
									{`${firstname} ${lastname} (${nickname})`}
								</div>
								<div className="column is-4" />
							</div>
					    </div>
					  </div>
					  <footer className="card-footer">
					    <Link to={`/user/${id}/edit`} className="card-footer-item">Edit</Link>
					    <Link to='/user/add' className="card-footer-item">Delete</Link>
					  </footer>
					</div>
				</div>
			</div>
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
)(HistoryUser)