import express from 'express'
import wifi from 'node-wifi'
import sh from 'shelljs'

const router = express.Router()

router.route('/')
	.get((req, res) => {
		wifi.scan(function(err, networks) {
		    if (err) {
		        console.log({err});
				res.json(err)
		    } else {
		        let x = networks.map(network => {
		        	return {
		        		ssid: network.ssid,
						signal: network.signal_level,
						security: network.security
		        	}
		        })
				x.sort((a, b) => (b.signal - a.signal))
				res.json(x)
		    }
		})

	})
	.post((req, res) => {
		let str_cmd = `sudo nmcli device wifi connect ${req.body.ssid}` + ((req.body.password != undefined) ? ` password ${req.body.password} `:' ') + `ifname wlan1`
		let output = sh.exec(str_cmd)
		if(output.stderr.indexOf('Error: Failed to add/activate new connection: Unknown error') != -1){
			res.json({
				ssid:req.body.ssid,
				status: 'Connected',
				error: ''
			})		
		} else {
			res.json({
				ssid:req.body.ssid,
				status: 'Unconnected',
				error: output.stderr
			})	
		}
	})


export default router