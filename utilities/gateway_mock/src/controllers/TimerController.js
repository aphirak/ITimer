import { state } from 'src/parameters'
import { emitTimer, pubTimingGate, stopTimer } from 'src/utilities'

const postTimer = (req, res) => {
	const { uid, nGate, distances } = req.body
	if (!state.isStarted && uid !== undefined && nGate >= 2 && distances.length === nGate - 1) {
		state.uid = uid
		state.nGate = nGate
		state.distances = distances
		state.isSetup = true
		pubTimingGate('SETUP')
		emitTimer()
		res.send(state)
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
