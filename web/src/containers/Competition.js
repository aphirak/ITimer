import React, { Component } from 'react'
import { connect } from 'react-redux'
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
			<Layout title='Competition'>
				{
					(competitions.length != 0) && <div className="notification is-primary">
						<h1 className="title">
							Top #1
						</h1>
						<h2 className="subtitle">
							User ID : {competitions[0].uid}
							<br />
							Time : {competitions[0].total_time} s
						</h2>
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
						      </tr>
							)
						})
					}
				</tbody>
				</table>
				<br />
				<button className='button is-danger' onClick={this.props.resetCompetitions}>Reset</button>
			</Layout>
		)
	}
}


const mapStateToProps = (state) => ({
	competition: state.competition
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