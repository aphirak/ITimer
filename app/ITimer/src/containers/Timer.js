import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import moment from 'moment'
import BackgroundTimer from 'react-native-background-timer';
import * as actions from 'ITimer/src/actions'
import { SetupTimer, DisplayTimer } from 'ITimer/src/components/timers'

const { setupTimer, stopTimer, getTimer } = actions
let x;

class Timer extends Component {

	state = {
		time: 0,
		isCallLocalTimer: false
	}

	aaa(initTime){
		let timestamp = moment.duration(initTime*1000, 'milliseconds')
		// console.log(timestamp)
		// x = setInterval(() => {
	    	// timestamp = moment.duration(timestamp + 77, 'milliseconds')
	    	// this.setState({ time: timestamp.asSeconds().toFixed(3) })
		// },77)
		x = BackgroundTimer.setInterval(() => {
	    	timestamp = moment.duration(timestamp + 77, 'milliseconds')
	    	this.setState({ time: timestamp.asSeconds().toFixed(3) })
		}, 37);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.timer.time != undefined){
			if(nextProps.timer.isStarted && !this.state.isCallLocalTimer){
				this.aaa.bind(this)(nextProps.timer.time)
			} else if(!nextProps.timer.isStarted){
				// clearInterval(x)
				BackgroundTimer.clearInterval(x);
				this.setState({ isCallLocalTimer: false, time: 0 })
			}
		}
	}

	componentWillUnmount(){
		// clearInterval(x)
		BackgroundTimer.clearInterval(x);
	}

	componentWillMount(){
		this.props.getTimer()
	}

	render(){
		const { gate, results, time, isStarted, isSetup, stopTimer, distances, nGate, uid } = this.props.timer
		console.log(this.props.nGate)
		console.log('----')
		return(
			<View>
				{
					(!isSetup) ? 
						<SetupTimer 
							handleSubmit={this.props.handleSubmit}
							nGate={this.props.nGate}
						/> :
						<DisplayTimer
							{...this.props.timer}
							time={(isStarted) ? this.state.time : time}
							stopTimer={this.props.stopTimer}
							goSetup={this.props.goSetup}
						/>
				}
			</View>
		)
	}
}

Timer = reduxForm({
	form: 'timerForm'
})(Timer)

const selector = formValueSelector('timerForm')

const mapStateToProps = (state) => ({
	timer: state.timer,
	nGate: selector(state, 'nGate')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSubmit(values){
		dispatch(setupTimer(values))
	},
	stopTimer(){
		dispatch(stopTimer())
	},
	getTimer(){
		dispatch(getTimer())
	},
	goSetup(){
		dispatch({
			type: 'SET_ISSETUP_TIMER',
			payload: false
		})
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Timer)