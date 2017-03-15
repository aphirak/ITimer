import http from 'http'
import config from 'config'
import app from '../app'
import sockets from './sockets'
import mqtt from './mqtt'

const server = http.Server(app)
const port = process.env.PORT || config.Api.port

server.listen(port, () => {
    console.log('[INFO] Listening on *:' + port)
})

sockets.init(server)
mqtt.init()