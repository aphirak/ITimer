import bookshelf from './bookshelf'
import {
	User,
	History,
	Detail
} from './models'

// new User({ username:"user4", firstname: "eiei1", lastname: "eiei2", nickname: "eiei3" }).save().then((error) => {
// 	bookshelf.knex.destroy()
// })

function insertHistory(uid, nGate){
	let results = [{phase: 1, distance: 100, time: 1.125, speed: 88.889 }, {phase: 2, distance: 200, time: 1.5, speed: 133.333 }]
	let total_distance = results.reduce((sum,value) => sum + (+value.distance), 0)
	let total_time = results.reduce((sum,value) => sum + (+value.time), 0).toFixed(3)
	let speedAverage = ((+total_distance)/(+total_time)).toFixed(3)
	new History({ user_id: uid, total_gate: nGate, total_distance, total_time, speed_average: speedAverage }).save().then((author) => {
		// console.log(value.attributes)
		results.map((result) => {
			new Detail({ history_id: author.attributes.id, phase: result.phase, distance: result.distance, time: result.time, speed: result.speed}).save()		
		})
		// bookshelf.knex.destroy()
	})
	// new History({id: 1}).fetch({withRelated: ['details']}).then(function(author) {
		// console.log(author)
	  // console.log(JSON.stringify(author.related('details')));
	// })
	// new History({id: 1}).fetch({withRelated: ['details']}).then(function(author) {
	// 	// console.log(author)
	//   console.log(JSON.stringify(author.related('details')));
	// })
}

insertHistory(1, 3)