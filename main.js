'use strict'
const Server = require('./server/server')
const SocketController = require('./server/socketController')
const serverConfig = require('./server/serverConfig.json')

/** init server **/
const server = new Server(serverConfig)
/** get server app **/
const app = server.getApp()
/** set static folder **/
server.setStaticFolder(__dirname + '/test')
/** send test page **/
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/test/index.html')
})

/** Create SocketController config **/
const socketControllerConfig = {
    io: server.getSocketIO(),
    eventHandlers: {
        disconnect: (socket, reason) => {
            console.error(reason)
        },
        test: (socket, message, date, reason) => {
            console.log(message)
        }
    },
    onConnection: socket => {
        console.log('connection')
    }
}

/** init socketController **/
const socketController = new SocketController(socketControllerConfig)