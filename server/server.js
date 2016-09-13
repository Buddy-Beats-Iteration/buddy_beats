var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const mongoose = require('mongoose');
const Board = require('./models/boardModel');
const userController = require('./controllers/userController');
const boardController = require('./controllers/boardController');
const mongoURI = 'mongodb://localhost/buddydb';
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('Connected with MongoDB ORM');
});

var serverBoard = [
        [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,0,0,1,0,0,1,0,1,0,0,1,0],
        [0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0]
      ];
var serverBoardName = '';
var dropdownValue = 0;

app.use(express.static(__dirname +'./../')); //serves the index.html
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

function toggleServer(arr){
	if (serverBoard[arr[0]][arr[1]] === 0) {
      serverBoard[arr[0]][arr[1]] = 1;
  } else {
    serverBoard[arr[0]][arr[1]] = 0;
  }
}

app.post('/saveBoard', boardController.saveBoard , function(req,res,next){
    
    res.status(200);
    res.send();
});

app.get('/getBoards', boardController.getBoards, function(req,res,next){
   
    console.log('yo');
    console.log(res.boards)

    res.status(200);
    res.send(res.boards);
});

//create a new user
app.post('/user', userController.createUser); 

//connects user to socket
io.on('connection', function(socket){
  //listens for first time client is rendered & sends serverBoard state to everyone
	socket.on('initialclientload', function(){
		socket.emit('sendserverboard',serverBoard);
		socket.broadcast.emit('sendserverboard',serverBoard);
	});

  //listens for 'toggle' event, grabs the array of the row, col, and val that were passed in, and broadcasts a 'togglereturn' event passing the array to the listeners
  socket.on('toggle', function(arr){
  	toggleServer(arr);
    socket.broadcast.emit('togglereturn', arr);
  });
  console.log('a user connnected');

  socket.on('boardChange', function(boardArray) {
    serverBoard = boardArray[1];
    serverBoardName = boardArray[0];
    dropdownValue = boardArray[2];
    socket.broadcast.emit('serverboardchanged', [serverBoard, serverBoardName, dropdownValue])
  })

  socket.on('updateDropdown', function() {
    socket.broadcast.emit('initUpdateDropdown')
  })
});


//THIS HAS TO BE DOWN HERE OMG THAT WAS MY PROBLEM ALL ALONG
app.listen(3000,function(){
  console.log("Started on PORT 3000");
});