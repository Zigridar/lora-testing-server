'use strict'
const express = require('express')
const parser = require('body-parser')
const cookie = require('cookie-parser')
const app = express()
const http = require('http')
const socketIO = require('socket.io')

/**
 * @param config = {
 *     port: SERVER_PORT
 * }
 *
 * */

/** Server constructor **/
function Server(config) {
    this._app = express()
    this._server = http.createServer(this._app)
    this._io = socketIO(this._server, {wsEngine: 'ws'})
    this._server.listen(config.port)
    /** set body-parser to server **/
    app.use(parser.urlencoded({ extended: true }))
    /** set cookie-parser to server **/
    app.use(cookie())
}

/**
 * Returns the server app which can be used to set server listeners like GET, POST ...
 *
 * @example
 *
 * const server = new Server(config)
 * const app = server.getApp()
 *
 * app.post('/', (request, response) => {
 *     first argument - host path,
 *     second - function which takes two parameters - request and response objects
 * })
 *
 * */
Server.prototype.getApp = function() {
    const self = this
    return self._app
}


/**
 * Returns the SocketIO entity related with the server
 * */
Server.prototype.getSocketIO = function() {
    const self = this
    return self._io
}

/**
 * Deploy folder with static files
 *
 * */
Server.prototype.setStaticFolder = function(absolutePath) {
    const self = this
    self._app.use(express.static(absolutePath))
}

module.exports = Server