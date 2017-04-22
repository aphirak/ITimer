import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import moment from 'moment'

import * as actions from 'actions'
import { DisplayTimer, SetupTimerMock } from 'components/timers'

const { setupTimer, stopTimer, getTimer } = actions
let localTime

class Timer extends Component {
	state = {
		time: 0,
		isCallLocalTimer: false
	}

	goSetup () {
		this.props.dispatch({
			type: 'SET_ISSETUP_TIMER',
			payload: false
		})
	}

	handleLocalTime (initTime) {
		clearInterval(localTime)
		let timestamp = moment.duration(initTime * 1000, 'milliseconds')
		localTime = setInterval(() => {
			timestamp = moment.duration(timestamp + 37, 'milliseconds')
			this.setState({ time: timestamp.asSeconds().toFixed(3) })
		}, 37)
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.timer.time !== undefined) {
			if (nextProps.timer.isStarted) {
				this.handleLocalTime.bind(this)(nextProps.timer.time)
			} else if (!nextProps.timer.isStarted) {
				clearInterval(localTime)
			}
		}
	}

	componentDidMount () {
		this.props.getTimer()
	}

	componentWillUnmount () {
		clearInterval(localTime)
	}

	render () {
		const { phase, results, time, isStarted, isSetup, nPhase, uid, mode } = this.props.timer
		return (
			<div>
				{
					(!isSetup) ? (
						<SetupTimerMock
							handleSubmit={this.props.handleSubmit}
							mode={this.props.mode}
							array={this.props.array} />
					) : (
						<DisplayTimer
							phase={phase}
							results={results}
							time={(isStarted) ? this.state.time : time}
							isStarted={isStarted}
							nPhase={nPhase}
							uid={uid}
							stopTimer={this.props.stopTimer}
							goSetup={this.goSetup.bind(this)}
							mode={mode} />
					)
				}
			</div>
		)
	}
}

// const validate = values => {
// 	let { uid, nGate } = values
// 	let errors = {}

// 	if (!uid || uid.trim() == '') {
//     	errors.uid = 'Required'
// 	}

// 	if (!nGate || nGate.trim() == '' || nGate > 10) {
//     	errors.nGate = 'Required'
// 	}

// 	return errors
// }

const selector = formValueSelector('timerForm')

	// initialValues: {
	// 	uid: state.timer.uid,
	// 	nPhase: state.timer.nPhase,
	// 	mode: state.timer.mode,
	// 	distances: state.timer.distances
	// },

const mapStateToProps = (state) => ({
	initialValues: {
		uid: state.timer.uid,
		nPhase: state.timer.nPhase,
		mode: state,
		routes: [{}]
	},
	mode: selector(state, 'mode'),
	timer: state.timer
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSubmit (value) {
		console.log(value)
		dispatch(setupTimer(value))
	},
	stopTimer () {
		dispatch(stopTimer())
	},
	getTimer () {
		dispatch(getTimer())
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(reduxForm({
	form: 'timerForm'
})(Timer))
