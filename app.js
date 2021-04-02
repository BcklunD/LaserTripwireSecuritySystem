'use strict'

// Set up environment variable
require('dotenv').config()

// Set up PORT and modules
const PORT = process.env.PORT || 5050
const express = require('express')
const fs = require('fs')
const http = require('http')
const WebSocket = require('ws')
const fetch = require('node-fetch')
const chokidar = require('chokidar')

// List of logged in clients
let loggedIn = []
let id = 0

// Set up server and socket
const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({
  server: server,
  clientTracking: true
})

// Instantiate file watcher
chokidar.watch('Videos').on('add', path => {
  const data = path.split('/')[1]
  wss.broadcast(data)
})

// Set up environment variable
const env = app.get('env')

// Parse request as JSON
app.use(express.json())

// Serve static files.
app.use(express.static(__dirname + '/Videos'))

// When a new client connects to the socket, send all issues
wss.on('connection', async (ws) => {
  // Ping client to keep connection up
  const interval = setInterval(() => { ws.ping() }, 50e3)

  console.log('Connection received. Adding client.')

  // Receive message from clients when reopening issues, closing issues or posting comments
  ws.on('message', (message) => {
    let password = message.split(' ')[0]
    let service = message.split(' ')[1]
    let data = {}
    if(password != process.env.PASSWORD) {
      data.error = true
      ws.send(JSON.stringify(data))
    } else if(service === 'stream') {
      let data = {src:'http://192.168.0.135:8000/stream.mjpg'}
      ws.send(JSON.stringify(data))
    } else {
      const files = fs.readdirSync(__dirname + '/Videos'); 
      data.files = []
      files.forEach((file) => {
        if(file.endsWith('.mp4')) data.files.push(file)
      })

      data.files.sort(function(a,b) {return b.split(',')[0] - a.split(',')[0]})
      ws.id = id
      loggedIn.push(id++)
      ws.send(JSON.stringify(data))
    }
  })

  // Clear timer on ping if connection closes
  ws.on('close', () => {
    clearInterval(interval)
    loggedIn.filter(id => id !== ws.id)
  })
})

/**
 * Broadcast data to every connected client.
 *
 * @param {JSON} data - JSON object to send to connected clients.
 */
wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && loggedIn.indexOf(client.id) !== -1) client.send(data)
  })
}

// Listen for HTTP requests
server.listen(PORT, () => {
  console.log(`Environment: ${env}`)
  console.log(`Server is listening on port ${PORT}`)
})
