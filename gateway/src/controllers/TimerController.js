import _ from 'lodash'

import { state } from 'src/parameters'
import { emitTimer, pubTimingGates, stopTimer } from 'src/utilities'

const postTimer = (req, res) => {
	const { uid, nPhase, routes, mode } = req.body
	let gates = _.uniq(routes.reduce((sum, route) => [...sum, parseInt(route.startGate), parseInt(route.endGate)], []))
	let distances = []
	gates.map((gate) => {
		distances.push([])
	})
	routes.map((route) => {
		distances[route.startGate - 1][route.endGate - 1] = +route.distance
		distances[route.endGate - 1][route.startGate - 1] = +route.distance
	})
	console.log(distances)
	if (!state.isStarted && uid !== undefined && distances.length >= 2 && ((mode === 'sprint' && nPhase >= 1) || mode === 'nonstop')) {
		state.uid = uid
		state.nPhase = parseInt(nPhase)
		state.distances = distances
		state.mode = mode
		state.isSetup = true
		pubTimingGates('SETUP')
		emitTimer()
		res.json({
			...state,
			competitions: undefined,
			timinggates: undefined
		})
	} else {
		res.status(403).json({
			status: 403,
			message: 'Parameter is incorrect'
		})
	}
}

const deleteTimer = (req, res) => {
	stopTimer()
	res.send('Stop timer success')
}

export {
	postTimer,
	deleteTimer
}
