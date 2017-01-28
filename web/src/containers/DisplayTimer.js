import React, { Component } from 'react'
import { Link } from 'react-router'
import { SetupTimer } from 'containers'

export default class DisplayTimer extends Component {
	render(){
		return (
			<div>
				DisplayTimer
				<br />
				<div>time : {this.props.time}</div>
				<div>phase : {this.props.phase}</div>
				<div>results : {JSON.stringify(this.props.results)}</div>
				<button
			        className={(this.props.isStarted) ? 'button is-danger' : 'button is-info'}
			        onClick={(this.props.isStarted) ? this.props.stopTimer : this.props.goSetup}>
			        {(this.props.isStarted) ? 'Stop' : 'Go To Setup'}
		    	</button>
			</div>
		)
	}
}