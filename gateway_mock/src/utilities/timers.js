import { io } from 'src/bin/socket'
import { state } from 'src/parameters'
import { emitCompetition, pubTimingGate } from 'src/utilities'

let prevTimeTracking

const emitTimer = (socket = io) => {
	socket.emit('timer', { ...state, competitions: undefined })
}

const stopTimer = () => {
	console.log('End')
	pubTimingGate('RESET')
	// console.log(state.results) // input to DB
	if (state.results.length !== 0) {
		let { results, uid } = state
		let totalDistance = results.reduce((sum, value) => sum + (+value.distance), 0)
		let totalTime = +results.reduce((sum, value) => sum + (+value.time), 0).toFixed(3)
		let speedAverage = +(totalDistance / totalTime).toFixed(3)
		// insertHistory(total_distance, total_time, speed_average)
		state.competitions.push({ uid, totalDistance, totalTime, speedAverage })
		emitCompetition()
	}
	// timer.clearInterval()
	// handleTimer.clearInterval()
	state.isStarted = false
	emitTimer()

	state.uid = undefined
	state.nGate = undefined
	state.distances = []
	state.gate = 0
	state.isSetup = false
	state.results = []
	state.time = 0
}

const trackingTimer = (msg) => {
	let { isStarted, isSetup, nGate, distances, results } = state
	let timeTracking = msg / 1000
	if (!isNaN(timeTracking) && isSetup) {
		++state.gate
		if (!isStarted) {
			state.isStarted = true
		} else {
			let distance = distances[state.gate - 2]
			let time = +(timeTracking - prevTimeTracking).toFixed(3)
			let speed = +(distance / time).toFixed(3)
			state.results.push({
				phase: state.gate - 1,
				time,
				distance,
				speed
			})
		}
		prevTimeTracking = timeTracking
		emitTimer()
		if (results.length === nGate - 1) {
			stopTimer()
		}
	}
}

export {
	emitTimer,
	stopTimer,
	trackingTimer
}
