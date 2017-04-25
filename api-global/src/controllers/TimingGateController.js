import { pubTimingGates } from 'src/utilities'
import { state } from 'src/parameters'

const getTimingGates = (req, res) => {
	state.timinggates = []
	pubTimingGates('STATUS')
	res.send('Get status timing gate success')
}

export {
	getTimingGates
}
