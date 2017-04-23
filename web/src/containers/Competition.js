import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as actions from 'actions'

const { getCompetitions, resetCompetitions } = actions

class Competition extends Component {
	state = {}

	componentDidMount () {
		this.props.getCompetitions()
	}

	render () {
		return (
			<div className='has-text-centered'>
				<div className='heading'>
					<div className='title'>
						<div className='columns is-gapless'>
							<div className='column is-3' />
							<div className='column'>
								<strong>Competition</strong>
							</div>
							<div className='column is-3' />
						</div>
					</div>
				</div>
				<hr />
				<div className='content'>
					{
						(this.props.competitions.length !== 0) && <div className='notification is-primary'>
							<h1 className='title'>
								<br />
								ID : {this.props.competitions[0].uid}
								<br />
								Time : {this.props.competitions[0].total_time} s
							</h1>
						</div>
					}
					<table className='table is-striped'>
						<thead>
							<tr>
								<th>#</th>
								<th>ID</th>
								<th>Distance</th>
								<th>Time</th>
								<th>Speed</th>
								<th>Option</th>
							</tr>
						</thead>
						<tbody>
							{
								this.props.competitions.map((competition, index) => {
									return (
										<tr key={index}>
											<td>{index + 1}</td>
											<td>{competition.uid}</td>
											<td>{competition.total_distance} m</td>
											<td>{competition.total_time} s</td>
											<td>{competition.speed_average} m/s</td>
											<td>
												<Link to={`/user/${competition.uid}/history`} className='button is-primary'>Detail</Link>
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
	competitions: state.competition.data,
	users: state.user.values
})

const mapDispatchToProps = (dispatch) => ({
	getCompetitions () {
		dispatch(getCompetitions())
	},
	resetCompetitions () {
		dispatch(resetCompetitions())
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Competition)
