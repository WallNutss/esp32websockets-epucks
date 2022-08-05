const PORT = process.env.PORT || 5000; // Defining the PORT we used for communication server
const INDEX =  '/index.html' // Page for the website
const PATH = require('path')
const express = require('express') // Node.js Application Framework
const WebSocket = require('ws') // Websocket Protocol Library

// Opening up the server using basic express library
const server = express()
    .use(express.static( __dirname + '/public'))
    .get('/', (req,res) =>{
    res.sendFile(INDEX, {root : __dirname})}) //Basic Routing when website hit '/', respond serve index.html
    .listen(PORT, ()=> console.log(`Listening on ${PORT}`))

// Opening or upgrade server to websocket server
const { Server } = require('ws')

// Implement Websocket Connection, the handskae are put in here
const wss = new Server({ server }) // This will now upgrade the listener to websocket connection whenever we hit '/' page index at website

// Implementing when handsake completed
wss.on('connection', function connection(ws,req){ // Taking the event, when handsake completed go 
    console.log("A Client has connected")
    console.log(`Now on Port ${PORT}`)
    ws.on('message', function incoming (data){ // Taking the event data incoming message, what to do going below
        wss.clients.forEach(function each(client){ // If ws detect message, take all current clients connected
            if(client != ws && client.readyState === WebSocket.OPEN){ //Ready state constant CONNECTION = 0 | OPEN = 1 | CLOSING = 2 | CLOSED = 3
                client.send(data.toString('utf8')) // If it's true some client open and sending message, send that data to all
            }
        })
    })
})

// Implementing when websocket connection in this client close
wss.on('close', function close(){
    console.log("Web Socket Closing")
}) // Which is impossible, because server always running, in this case heroku has implemented if there is no activities in
   // Duration of 6 hours, server will sleep 
