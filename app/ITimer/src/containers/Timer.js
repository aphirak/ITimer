import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import * as actions from 'ITimer/src/actions'
import { SetupTimer, DisplayTimer } from 'ITimer/src/components/timers'

const { setupTimer, stopTimer, getTimer } = actions

class Timer extends Component {

	componentWillMount(){
		this.props.getTimer()
	}

	render(){
		const { gate, results, time, isStarted, isSetup, stopTimer, distances, nGate, uid } = this.props.timer
		return(
			<View>
				{
					(!isSetup) ? 
						<SetupTimer 
							onSubmit={this.props.setupTimer}
						/> :
						<DisplayTimer
							{...this.props.timer}
							stopTimer={this.props.stopTimer}
							goSetup={this.props.goSetup}
						/>
				}
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	timer: state.timer
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	setupTimer(values){
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