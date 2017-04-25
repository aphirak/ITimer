import wifi from 'node-wifi'
import sh from 'shelljs'

wifi.init({
	iface: 'wlan1'
})

const getWifi = (req, res) => {
	wifi.scan((err, networks) => {
		if (err) {
			console.log({ err })
			res.json(err).status(500)
		} else {
			let list_wifi = networks.map(network => {
				return {
					ssid: network.ssid,
					signal: network.signal_level,
					security: network.security
				}
			})
			list_wifi.sort((a, b) => (b.signal - a.signal))
			res.json(list_wifi)
		}
	})
}

const postWifi = (req, res) => {
	let str_cmd = `sudo nmcli device wifi connect ${req.body.ssid}` + ((req.body.password !== undefined) ? ` password ${req.body.password} ` : ' ') + `ifname wlan1`
	let output = sh.exec(str_cmd)
	if (output.stderr.indexOf('Error: Failed to add/activate new connection: Unknown error') !== -1) {
		getWifiConnected(req, res)
	} else {
		res.json({
			ssid: req.body.ssid,
			status: 'Unconnected',
			error: output.stderr
		}).status(500)
	}
}

const getWifiConnected = (req, res) => {
	let str_cmd = `nmcli device show wlan1`
	let output = sh.exec(str_cmd)
	if (output.stderr.indexOf(`Error: Device 'wlan1' not found.`) === -1) {
		let data = output.stdout.split('\n').filter(value => value.indexOf('GENERAL.CONNECTION') !== -1 || value.indexOf('IP4.ADDRESS[1]') !== -1)
		let ssid = data[0].replace(/\s/g, '').split(':')[1]
		let ip = data[1].replace(/\s/g, '').split(/[=,/]/)[1]
		res.json({
			ssid,
			ip,
			status: 'Connected'
		})
	} else {
		res.json({ error: output.stderr })
	}
}

export {
	getWifi,
	postWifi,
	getWifiConnected
}

// router.route('/')
// 	.get((req, res) => {
// 		wifi.scan(function(err, networks) {
// 		    if (err) {
// 		        console.log({err});
// 				res.json(err)
// 		    } else {
// 		        let x = networks.map(network => {
// 		        	return {
// 		        		ssid: network.ssid,
// 						signal: network.signal_level,
// 						security: network.security
// 		        	}
// 		        })
// 				x.sort((a, b) => (b.signal - a.signal))
// 				res.json(x)
// 		    }
// 		})

// 	})
// 	.post((req, res) => {
// 		let str_cmd = `sudo nmcli device wifi connect ${req.body.ssid}` + ((req.body.password != undefined) ? ` password ${req.body.password} `:' ') + `ifname wlan1`
// 		let output = sh.exec(str_cmd)
// 		if(output.stderr.indexOf('Error: Failed to add/activate new connection: Unknown error') != -1){
// 			res.json({
// 				ssid:req.body.ssid,
// 				status: 'Connected',
// 				error: ''
// 			})		
// 		} else {
// 			res.json({
// 				ssid:req.body.ssid,
// 				status: 'Unconnected',
// 				error: output.stderr
// 			})	
// 		}
// 	})

// export default router
