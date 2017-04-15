import { state } from 'src/parameters'
import { emitTimer, pubTimingGates, stopTimer } from 'src/utilities'

const postTimer = (req, res) => {
	const { uid, nGate, distances, mode } = req.body
	if (!state.isStarted && uid !== undefined && nGate >= 2 && distances.length === nGate) {
		state.uid = uid
		state.nGate = nGate
		state.distances = distances
		state.isSetup = true
		state.mode = mode || 'sprint'
		pubTimingGates('SETUP')
		emitTimer()
		res.send({
			...state,
			competitions: undefined,
			timinggates: undefined
		})
	} else {
		res.status(400).json({
			status: 400,
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
