import { io } from 'src/bin/socket'
import { state } from 'src/parameters'
import { emitCompetition, pubTimingGates, insertHistory } from 'src/utilities'

let prevTimeTracking, prevTimingGate

const emitTimer = (socket = io) => {
	socket.emit('timer', {
		...state,
		competitions: undefined,
		timinggates: undefined
	})
}

const stopTimer = () => {
	console.log('End')
	pubTimingGates('RESET')
	console.log(state.results)
	let { results, uid } = state
	if (results.length !== 0) {
		let totalDistance = results.reduce((sum, value) => sum + (+value.distance), 0)
		let totalTime = +results.reduce((sum, value) => sum + (+value.time), 0).toFixed(3)
		let speedAverage = +(totalDistance / totalTime).toFixed(3)
		insertHistory(totalDistance, totalTime, speedAverage)
		state.competitions.push({ uid, totalDistance, totalTime, speedAverage })
		emitCompetition()
	}
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

const trackingTimer = (msgJson) => {
	let { isStarted, isSetup, nGate, distances } = state
	let timeTracking = msgJson.payload / 1000
	if (!isNaN(timeTracking) && isSetup) {
		++state.gate
		if (!isStarted) {
			state.isStarted = true
		} else {
			let distance = distances[prevTimingGate - 1][msgJson.id - 1]
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
		prevTimingGate = msgJson.id
		emitTimer()
		if (state.results.length === nGate - 1) {
			stopTimer()
		}
	}
}

export {
	emitTimer,
	stopTimer,
	trackingTimer
}
