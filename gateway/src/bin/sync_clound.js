import axios from 'axios'

import {
	UserService,
	HistoryService,
	DetailService
} from 'src/services'

let init = () => {
	function syncGlobal () {
		let p1 = UserService.getUsers().then(users => users)

		let p2 = HistoryService.getHistories().then(histories => histories)

		let p3 = DetailService.getDetails().then(details => details)

		Promise.all([ p1, p2, p3 ]).then((values) => {
			let results = {
				users: values[0],
				histories: values[1],
				details: values[2]
			}
			return results
		}).then((data) => {
			axios.post(`http://localhost:7070/api/sync`, data)
			.then((response) => {
				console.log(response.data)
			})
			.catch((error) => {
				console.log(error)
				if (error.response) {
					console.log(error.response.data)
					console.log(error.response.status)
					console.log(error.response.headers)
				}
			})
		})
	}

	function checkInternet () {
		setInterval(() => {
			syncGlobal()
		// dns.resolve('www.google.com', (err) => {
		// 	if (err) {
		// 		io.emit('connectInternet', 'not ok')
		// 		console.log("No connection")
		// 	} else {
		// 		io.emit('connectInternet', 'ok')
		// 		console.log("Connected")
		// 	}
		// })
		}, 5000)
	}
	checkInternet()
}

export {
	init
}
