import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Layout from 'components/Layout'
import * as actions from 'actions'

const { getCompetitions, resetCompetitions } = actions


class Competition extends Component {

	state = {}

	componentWillMount(){
		this.props.getCompetitions()
	}

	render(){
		let competitions = [...this.props.competition.data].sort((a, b) => (a.total_time - b.total_time))
		return (
			<div className="has-text-centered">
				<div className="heading">
					<div className="title">
						<div className="columns is-gapless">
						  <div className="column is-3" />
						  <div className="column">
						    <strong>Competition</strong>
						  </div>
						  <div className="column is-3">
						  </div>
						</div>
					</div>
				</div>
				<hr />
				<div className='content'>
					{
						(competitions.length != 0) && <div className="notification is-primary">
							<h1 className="title">
								<br />
								User ID : {competitions[0].uid}
								<br />
								Time : {competitions[0].total_time} s
							</h1>
						</div>					
					}

					<table className="table is-striped">
					<thead>
					  <tr>
					    <th>#</th>
					    <th>User ID</th>
					    <th>Distance</th>
					    <th>Time</th>
					    <th>Speed</th>
					    <th>Option</th>
					  </tr>
					</thead>
					<tbody>
						{
							competitions.map((competition, index) => {
								return (
							      <tr key={index}>
							        <td>{index+1}</td>
							        <td>{competition.uid}</td>
							        <td>{competition.total_distance} m</td>
							        <td>{competition.total_time} s</td>
							        <td>{competition.speed_average} m/s</td>
							        <td>
										<Link to={`/user/${competition.uid}/history`} className="button is-primary">Detail</Link>
							        </td>
							      </tr>
								)
							})
						}
					</tbody>
					</table>
					<br />
					<button className='button is-danger' onClick={this.props.resetCompetitions}>Reset</button>
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state) => ({
	competition: state.competition,
	users: state.user.values
})

const mapDispatchToProps = (dispatch) => ({
	getCompetitions(){
		dispatch(getCompetitions())
	},
	resetCompetitions(){
		dispatch(resetCompetitions())
	}
})

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Competition)