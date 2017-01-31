import React, { Component } from 'react'
import { Link } from 'react-router'
import { SetupTimer } from 'containers'

export default class DisplayTimer extends Component {
	render(){
		return (
			<div className="has-text-centered">
				<div className="heading">
					<h1 className="title">
						<strong>Time</strong>
					</h1>
				</div>
				<hr />
				<div className="content">
					<h1>{this.props.time}</h1>
					<div><strong>Phase</strong> : {this.props.phase}</div>
					<br />
					{
						(this.props.results.length != 0) && (
						  <table>
						    <thead>
						      <tr>
						        <th>Phase</th>
						        <th>Time</th>
						      </tr>
						    </thead>
						    <tbody>
						    	{
						    		this.props.results.map((result, index) => {
						    			return (
									      <tr>
									        <td>{index+1}</td>
									        <td>{result}</td>
									      </tr>
						    			)
						    		})
						    	}
						    </tbody>
						  </table>
						)
					}
					<button
				        className={(this.props.isStarted) ? 'button is-danger' : 'button is-info'}
				        onClick={(this.props.isStarted) ? this.props.stopTimer : this.props.goSetup}>
				        {(this.props.isStarted) ? 'Stop' : 'Go To Setup'}
			    	</button>
				</div>
			</div>
		)
	}
}