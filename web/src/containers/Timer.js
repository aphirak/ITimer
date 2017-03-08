import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import NanoTimer from 'nanotimer'
import moment from 'moment'
import * as actions from 'actions'
import { DisplayTimer, SetupTimer } from 'components/timers'

const { setupTimer, stopTimer, getTimer } = actions
let x;

class Timer extends Component {

	state = {
		time: 0,
		isCallLocalTimer: false
	}

	goSetup(){
		this.props.dispatch({
			type: 'SET_ISSETUP_TIMER',
			payload: false
		})
	}

	aaa(initTime){
		let timestamp = moment.duration(initTime*1000, 'milliseconds')
		console.log(timestamp)
		x = setInterval(() => {
	    	timestamp = moment.duration(timestamp + 37, 'milliseconds')
	    	this.setState({ time: timestamp.asSeconds().toFixed(3) })
		},37)
		this.setState({ isCallLocalTimer: true })
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.timer.time != undefined){
			if(nextProps.timer.isStarted && !this.state.isCallLocalTimer){
				this.aaa.bind(this)(nextProps.timer.time)
			} else if(!nextProps.timer.isStarted){
				clearInterval(x)
				this.setState({ isCallLocalTimer: false })
			}
		}
	}

	componentWillUnmount(){
		clearInterval(x)
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
							nGate={this.props.nGate}
						/> :
						<DisplayTimer 
							gate={gate}
							results={results}
							time={(isStarted) ? this.state.time : time}
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
	nGate: selector(state, 'nGate'),
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