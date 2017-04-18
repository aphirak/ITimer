import { state } from 'src/parameters'
import { emitTimer, pubTimingGates, stopTimer } from 'src/utilities'

const postTimer = (req, res) => {
	const { uid, nPhase, distances, mode } = req.body
	console.log(req.body)
	if (!state.isStarted && uid !== undefined && distances.length >= 2 && ((mode === 'sprint' && nPhase >= 1) || mode === 'nonstop')) {
		state.uid = uid
		state.nPhase = nPhase
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
