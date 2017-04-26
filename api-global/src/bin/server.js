import http from 'http'
import config from 'config'

import app from 'src/app'
import * as socket from 'src/bin/socket'
import * as mqtt from 'src/bin/mqtt'

const server = http.Server(app)
const port = process.env.PORT || config.Api.port

server.listen(port, () => {
	console.log('[INFO] Listening on *:' + port)
})

socket.init(server)
mqtt.init()
