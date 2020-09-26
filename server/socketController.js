'use strict'

/**
 * @param config = {
 *     eventHandlers: {
 *         handler_0: () => {...},
 *         handler_1: () => {...},
 *         handler_2: () => {...}
 *         ....
 *     },
 *     onconnection: socket => {...},
 *     io: socket.io
 * }
 *
 * */

/** constructor **/
function SocketController(config) {
    this.io = config.io
    this.users = [] //todo
    this.tokens = new Set() //todo
    this.teams = new Map() //todo
    this.authTokens = {} //todo
    this.onConnection = config.onConnection
    /** init controller **/
    const self = this
    self.io.on('connection', socket => {
        self.onConnection(socket)
        Object.entries(config.eventHandlers).forEach(handler => {
            const [handlerName, _handler] = handler
            socket.on(handlerName, (...args) => {
                _handler(socket, ...args)
            })
        })
    })
}

module.exports = SocketController
