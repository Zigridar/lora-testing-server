'use strict'

/**
 * TEST Script
 *
 * */

/** socket init **/
const socket = io.connect({
    forceNew: true,
    transports: ['websocket'],
    allowUpgrades: false,
    pingTimeout: 30000
})

setTimeout(() => {
    socket.emit('test', 'test', new Date(), 'reason')
}, 5000)
