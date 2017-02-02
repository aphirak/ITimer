const bookshelf = require('./bookshelf')
import {
	User,
	History,
	Detail
} from './models'

let p1 = User.forge().fetchAll().then((collection) => {
	return collection.toJSON()
})

let p2 = History.forge().fetchAll().then((collection) => {
	return collection.toJSON()
})

let p3 = Detail.forge().fetchAll().then((collection) => {
	return collection.toJSON()
})

Promise.all([ p1, p2, p3 ]).then((values) => {
	let results = {
		users: values[0],
		histories: values[1],
		details: values[2]
	}
	console.log(results)
})