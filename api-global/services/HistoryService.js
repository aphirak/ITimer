import { History, Detail } from '../models'
import bookshelf from '../bookshelf'

const getHistories = () => {
	return History.forge().fetchAll().then((collection) => {
		return collection.toJSON()
	})
}

const postHistory = ( uid, nGate, results, total_distance, total_time, speed_average ) => {
	bookshelf.transaction(function(t) {
	   return History.forge({ 
		user_id: uid, 
		total_gate: nGate, 
		total_distance, 
		total_time, 
		speed_average 
		}).save(null, {transacting: t}).then((history) => {
			results.map((result) => {
				Detail.forge(result)
						.save({ history_id: history.attributes.id })		
			})
		})
	   .then(t.commit)
	   .catch(function(e) {
	        t.rollback()
	        throw e
	   })
	})
}

export {
	getHistories,
	postHistory
}