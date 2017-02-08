import React from 'react'
import Layout from 'components/Layout'

const DisplayTimer = ({ time, gate, results, isStarted, stopTimer, goSetup, nGate, uid, distances }) => {
	let total_distance = results.reduce((sum,value) => sum + (+value.distance), 0).toFixed(3)
	let total_time = results.reduce((sum,value) => sum + (+value.time), 0).toFixed(3)
	let speedAverage = ((+total_distance)/(+total_time)).toFixed(3)
	return (
		<Layout title='Time' size='is-large'>
			<h1>{time} s</h1>
			<div><strong>Timing Gate</strong> : {gate} / {nGate}</div>
			<div><strong>User ID</strong> : {uid}</div>
			<br />
			{
				(results.length != 0) && (
				  <table className="table is-striped">
				    <thead>
				      <tr>
				        <th>Phase</th>
				        <th>Distance</th>
				        <th>Time</th>
				        <th>Speed</th>
				      </tr>
				    </thead>
				    <tbody>
				    	{
				    		results.map((result, index) => {
				    			return (
							      <tr key={index}>
							        <td>{result.phase}</td>
							        <td>{result.distance} m</td>
							        <td>{result.time} s</td>
							        <td>{result.speed} m/s</td>
							      </tr>
				    			)
				    		})
				    	}
						<tr>
							<td><strong>Total</strong></td>
							<td><strong>{total_distance} m</strong></td>
							<td><strong>{total_time} s</strong></td>
							<td><strong>{speedAverage} m/s</strong></td>
						</tr>
				    </tbody>
				  </table>
				)
			}
			<button
		        className={(isStarted) ? 'button is-danger' : 'button is-info'}
		        onClick={() => (isStarted) ? stopTimer() : goSetup()}>
		        {(isStarted) ? 'Stop' : 'Go To Setup'}
	    	</button>
		</Layout>
	)
}

export default DisplayTimer