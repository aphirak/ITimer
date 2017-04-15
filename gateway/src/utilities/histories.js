import { HistoryService } from 'src/services'
import { state } from 'src/parameters'

const insertHistory = (totalDistance, totalTime, speedAverage) => {
	let { uid, nGate, results } = state
	HistoryService.postHistory(uid, nGate, results, totalDistance, totalTime, speedAverage)
}

export {
	insertHistory
}
