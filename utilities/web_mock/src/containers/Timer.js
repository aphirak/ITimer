import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import moment from 'moment'

import * as actions from 'actions'
import { DisplayTimer, SetupTimerMock } from 'components/timers'

const { setupTimer, stopTimer, getTimer } = actions
let x

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

	aaa (initTime) {
		let timestamp = moment.duration(initTime * 1000, 'milliseconds')
		x = setInterval(() => {
			timestamp = moment.duration(timestamp + 37, 'milliseconds')
			this.setState({ time: timestamp.asSeconds().toFixed(3) })
		}, 37)
		this.setState({ isCallLocalTimer: true })
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.timer.time !== undefined) {
			if (nextProps.timer.isStarted && !this.state.isCallLocalTimer) {
				this.aaa.bind(this)(nextProps.timer.time)
			} else if (!nextProps.timer.isStarted) {
				clearInterval(x)
				this.setState({ isCallLocalTimer: false })
			}
		}
	}

	componentWillUnmount () {
		clearInterval(x)
	}

	componentDidMount () {
		this.props.getTimer()
	}

	render () {
		const { gate, results, time, isStarted, isSetup, distances, nGate, uid } = this.props.timer
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
							gate={gate}
							results={results}
							time={(isStarted) ? this.state.time : time}
							isStarted={isStarted}
							nGate={nGate}
							distances={distances}
							uid={uid}
							stopTimer={this.props.stopTimer}
							goSetup={this.goSetup.bind(this)} />
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
