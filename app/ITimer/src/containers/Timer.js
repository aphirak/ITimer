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
							onSubmit={(values) => alert(JSON.stringify(values))}
						/> :
						<DisplayTimer 
							onSubmit={(values) => alert(JSON.stringify(values))}
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
	onSubmit(value){
		dispatch(setupTimer(value))
	},
	stopTimer(){
		dispatch(stopTimer())
	},
	getTimer(){
		console.log('eiei')
		dispatch(getTimer())
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Timer)