import React, { Component } from 'react'

export default class User extends Component {
	render(){
		return (
			<div className="has-text-centered">
				<div className="heading">
					<h1 className="title">
						<strong>User</strong>
					</h1>
				</div>
				<hr />
				<div className="content">
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
				</div>
			</div>
		)
	}
}