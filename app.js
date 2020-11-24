const express = require('express')
const https = require('https')
const socketio = require('socket.io')
const gameLogic = require('./game-logic')
const app = express()
var fs = require('fs');
var options = {
  key: fs.readFileSync('./ssl/file.pem'),
  cert: fs.readFileSync('./ssl/file.crt')
};
/**
 * Backend flow:
 * - check to see if the game ID encoded in the URL belongs to a valid game session in progress. 
 * - if yes, join the client to that game. 
 * - else, create a new game instance. 
 * - '/' path should lead to a new game instance. 
 * - '/game/:gameid' path should first search for a game instance, then join it. Otherwise, throw 404 error.  
 */


const server = https.createServer(options,app)
const io = socketio(server)

// get the gameID encoded in the URL. 
// check to see if that gameID matches with all the games currently in session. 
// join the existing game session. 
// create a new session.  
// run when client connects

// io.on('connection', client => {
//     console.log('connected');
//     gameLogic.initializeGame(io, client)
// })

io.on('connection', function(socket){
    console.log('connected');
    gameLogic.initializeGame(io, socket)
  });

// usually this is where we try to connect to our DB.
//server.listen(process.env.PORT || 8000)

server.listen(8000, function(){
    console.log(`listening on http://localhost:8443`);
  });
console.log(process.env.PORT);