import { state } from 'src/parameters'
import { emitCompetition } from 'src/utilities'

const deleteCompetition = (req, res) => {
	state.competitions = []
	emitCompetition()
	res.send('Reset competition success')
}

export {
	deleteCompetition
}
