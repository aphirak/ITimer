import { HistoryService } from 'src/services'
import { state } from 'src/parameters'

const insertHistory = (totalDistance, totalTime, speedAverage) => {
	let { uid, results } = state
	HistoryService.postHistory(uid, results, totalDistance, totalTime, speedAverage)
}

export {
	insertHistory
}
