import React from 'react'

import Layout from 'components/Layout'

const DisplayTimer = ({ time, phase, results, isStarted, stopTimer, goSetup, nPhase, uid, mode }) => {
	let total_distance = +results.reduce((sum, value) => sum + (+value.distance), 0).toFixed(3)
	let total_time = +results.reduce((sum, value) => sum + (+value.time), 0).toFixed(3)
	let speed_average = +(total_distance / total_time).toFixed(3)
	return (
		<Layout title='Time' size='is-large'>
			<h1>{time} s</h1>
			<div><strong>Phase</strong> : {phase} / {nPhase || 'unlimited'}</div>
			<div><strong>Mode</strong> : {mode}</div>
			<div><strong>User ID</strong> : {uid}</div>
			<br />
			{
				(results.length !== 0) && (
					<table className='table is-striped'>
						<thead>
							<tr>
								<th>Phase</th>
								<th>Distance (m)</th>
								<th>Time (s)</th>
								<th>Speed (m/s)</th>
							</tr>
						</thead>
						<tbody>
							{
								results.map((result, index) => {
									return (
										<tr key={index}>
											<td>{result.phase}</td>
											<td>{result.distance}</td>
											<td>{result.time}</td>
											<td>{result.speed}</td>
										</tr>
									)
								})
							}
							<tr>
								<td><strong>Total</strong></td>
								<td><strong>{total_distance}</strong></td>
								<td><strong>{total_time}</strong></td>
								<td><strong>{speed_average}</strong></td>
							</tr>
						</tbody>
					</table>
				)
			}
			<button
				className={(isStarted) ? 'button is-danger' : 'button is-info'}
				onClick={() => (isStarted) ? stopTimer() : goSetup()} >
				{(isStarted) ? 'Stop' : 'Go To Setup'}
			</button>
		</Layout>
	)
}

export default DisplayTimer
