import { io } from 'src/bin/socket'
import { state } from 'src/parameters'
import { emitCompetition, pubTimingGates, insertHistory } from 'src/utilities'

let prevTimeTracking, prevTimingGate
let phase = 0

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
	state.nPhase = undefined
	state.distances = []
	state.isSetup = false
	state.results = []
	state.time = 0
	phase = 0
}

const trackingTimer = (msgJson) => {
	let { isStarted, isSetup, nPhase, distances, mode } = state
	let timeTracking = msgJson.payload / 1000
	if (!isNaN(timeTracking) && isSetup) {
		if (!isStarted) {
			state.isStarted = true
		} else {
			++phase
			let distance = distances[prevTimingGate - 1][msgJson.id - 1]
			let time = +(timeTracking - prevTimeTracking).toFixed(3)
			let speed = +(distance / time).toFixed(3)
			state.results.push({
				phase,
				time,
				distance,
				speed
			})
		}
		prevTimeTracking = timeTracking
		prevTimingGate = msgJson.id
		emitTimer()
		pubTimingGates('AGAIN')
		if (mode !== 'nonstop' && state.results.length === nPhase) {
			stopTimer()
		}
	}
}

export {
	emitTimer,
	stopTimer,
	trackingTimer
}
