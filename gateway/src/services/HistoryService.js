import { History, Detail } from 'src/models'
import bookshelf from 'root/bookshelf'

const getHistories = () => {
	return History.forge().fetchAll().then((collection) => {
		return collection.toJSON()
	})
}

const postHistory = (uid, results, totalDistance, totalTime, speedAverage) => {
	bookshelf.transaction((t) => {
		return History.forge({
			user_id: uid,
			total_phase: results.length,
			total_distance: totalDistance,
			total_time: totalTime,
			speed_average: speedAverage
		}).save(null, { transacting: t }).then((history) => {
			results.map((result) => {
				Detail.forge(result)
						.save({ history_id: history.attributes.id })
			})
		})
		.then(t.commit)
		.catch((e) => {
			t.rollback()
			throw e
		})
	})
}

export {
	getHistories,
	postHistory
}
