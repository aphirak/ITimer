import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import * as actions from 'actions'
import { DisplayTimer, SetupTimer } from 'components/timers'

const { setupTimer, stopTimer, getTimer } = actions

class Timer extends Component {

	state = {}

	goSetup(){
		this.props.dispatch({
			type: 'SET_ISSETUP_TIMER',
			payload: false
		})
	}

	componentWillMount(){
		this.props.getTimer()
	}

	render(){
		const { gate, results, time, isStarted, isSetup, stopTimer, distances, nGate, uid } = this.props.timer
		return (
			<div>
				{
					(!isSetup) ? 
						<SetupTimer
							handleSubmit={this.props.handleSubmit}
						/> :
						<DisplayTimer 
							gate={gate}
							results={results}
							time={time}
							isStarted={isStarted}
							nGate={nGate}
							distances={distances}
							uid={uid}
							stopTimer={this.props.stopTimer}
							goSetup={this.goSetup.bind(this)}
						/> 
				}
			</div>
		)
	}
}

Timer = reduxForm({
	form: 'timerForm'
})(Timer)

const selector = formValueSelector('timerForm')

const mapStateToProps = (state) => ({
	initialValues: {
		uid: state.timer.uid,
		nGate: state.timer.nGate,
		distanceType: 0,
		distances: state.timer.distances
	},
	timer: state.timer
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSubmit(value){
		dispatch(setupTimer(value))
	},
	stopTimer(){
		dispatch(stopTimer())
	},
	getTimer(){
		dispatch(getTimer())
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Timer)