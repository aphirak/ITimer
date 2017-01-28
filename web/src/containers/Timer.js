import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import socket from 'socket.io-client'
import { push } from 'react-router-redux'
import { SetupTimer, DisplayTimer } from 'containers'
import * as actions from 'actions'

const io = socket('http://localhost:9090')
const { stopTimer } = actions

class Timer extends Component {

	state = {
		phase: 0,
		isSetup: false,
		isStarted: false,
		results: [],
		time: 0
	}

	goSetup(){
		this.setState({isSetup: false})
	}

	componentDidMount(){
		io.on('timer', (data) => {
			let { phase, isSetup, isStarted, results, time } = data
			this.setState({ phase, isSetup, isStarted, results, time })
		})
	}

	render(){
		return (
			<div>
				{ 
					(this.state.isSetup) ? <DisplayTimer 
												phase={this.state.phase}
												results={this.state.results}
												time={this.state.time}
												isStarted={this.state.isStarted}
												stopTimer={this.props.stopTimer}
												goSetup={this.goSetup.bind(this)}
											/> : <SetupTimer />

				}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
	stopTimer(){
		dispatch(stopTimer())
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Timer)