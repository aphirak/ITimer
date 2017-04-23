import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import moment from 'moment'
import BackgroundTimer from 'react-native-background-timer';
import * as actions from 'ITimer/src/actions'
import { SetupTimer, DisplayTimer, SetupTimerMock } from 'ITimer/src/components/timers'

const { setupTimer, stopTimer, getTimer } = actions
let x;

class Timer extends Component {

	state = {
		time: 0,
		isCallLocalTimer: false,
		selectValue: undefined
	}

	aaa(initTime){
		BackgroundTimer.clearInterval(x);		
		let timestamp = moment.duration(initTime*1000, 'milliseconds')
		x = BackgroundTimer.setInterval(() => {
	    	timestamp = moment.duration(timestamp + 37, 'milliseconds')
	    	this.setState({ time: timestamp.asSeconds().toFixed(3) })
		}, 37);
	}

	handleSelect(value){
		this.setState({ selectValue: value })
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.timer.time != undefined){
			if(nextProps.timer.isStarted){
				this.aaa.bind(this)(nextProps.timer.time)
			} else if(!nextProps.timer.isStarted){
				BackgroundTimer.clearInterval(x);
			}
		}
	}

	componentWillUnmount(){
		BackgroundTimer.clearInterval(x);
	}

	componentDidMount(){
		this.props.getTimer()
	}

	render(){
		const { phase, results, time, isStarted, isSetup, nPhase, uid, mode } = this.props.timer
		return(
			<View>
				{
					(!isSetup) ? 
						<SetupTimerMock
							handleSubmit={this.props.handleSubmit}
							mode={this.props.mode}
							array={this.props.array}
							handleSelect={this.handleSelect.bind(this)}
							selectValue={this.state.selectValue}
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

const selector = formValueSelector('timerForm')

const mapStateToProps = (state) => ({
	initialValues: {
		uid: state.timer.uid,
		nPhase: state.timer.nPhase,
		mode: state.timer.mode,
		routes: [{}]
	},
	mode: selector(state, 'mode'),
	timer: state.timer
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSubmit(values){
		// console.log(values)
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
)(reduxForm({
	form: 'timerForm'
})(Timer))