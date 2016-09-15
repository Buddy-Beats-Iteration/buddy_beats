import React, { Component } from 'react';
import { render } from 'react-dom';
import Board from './Board';
import Player from './Player';
import Selector from './Selector';


var socket = io();


class App extends Component {
  constructor() {
    super();
    this.state = {
      boardname: '',
      board: [
        [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ],
      dropdownValue: 0,
      bpm: 160,
      looping: false
    }
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBoardNameChange = this.handleBoardNameChange.bind(this);
    this.changeBoard = this.changeBoard.bind(this);
    this.catchToggle = this.catchToggle.bind(this);
    this.catchServerBoard = this.catchServerBoard.bind(this);
    this.catchServerBoardChange = this.catchServerBoardChange.bind(this);
    this.catchTimestamp = this.catchTimestamp.bind(this);
    this.toggleStart = this.toggleStart.bind(this);
    this.toggleStop = this.toggleStop.bind(this);
    this.changeBpm = this.changeBpm.bind(this);
    this.remoteChangeBpm = this.remoteChangeBpm.bind(this);
  }

  //alters color of each button on click
  toggle(row, col){
   
    //emit 'toggle' event on click of each button, passing in the row & col of the button clicked and its value
    socket.emit('toggle', [row, col, this.state.board[row][col]]);
    var copy = this.state.board.slice();
    copy[row][col] = (copy[row][col] === 1) ? 0 : 1;
    this.setState({board:copy});
  }

  //save state of board
  handleSubmit(e){
    e.preventDefault();
    var that = this;
    $.post('/saveBoard',{name: that.state.boardname, board: that.state.board}, function(){
      console.log('successful save');
     that.setState({boardname: ""})
    }).then(() => {
        socket.emit('updateDropdown');
        $.get('/getBoards', (result) => {
          var validBoards = result
                            .map((boardObj) => {
                              boardObj.board = boardObj.board.map((arr) => {
                                return arr.map(Number)
                              })
                              return {
                                name: boardObj.name, 
                                board: boardObj.board}})
                            .filter((boardObj) => {
                              return (boardObj.board.length > 0);
                            })
        this.setState({otherBoards: validBoards});
      });
    });
    this.refs.textinput.value = "";

  }

  //remote client changes board, this updates client 1
  catchServerBoardChange(serverBoardArr) {
    console.log("caught serverboardchange", serverBoardArr)
    this.setState({board: serverBoardArr[0], boardname: serverBoardArr[1], dropdownValue: serverBoardArr[2]})//might be boardname
  }

  componentDidMount(){
    //this makes a request to board on server, gets board from client 2, sets state on client 1
    socket.on('serverboardchanged', this.catchServerBoardChange);
    // send client 1 initial board to client 2
    socket.emit('initialclientload');
    //remote person clicks box? update client 1? 
    socket.on('sendserverboard', this.catchServerBoard);
    //remote person clicked box, update box value
    socket.on('togglereturn', this.catchToggle);
    //update bpm change from other client
    socket.on('remoteChangeBpm', this.remoteChangeBpm);
    socket.on('initUpdateDropdown', () => {
      //update the dropdown on the Socket side and passing new board configurations to the socket client
      $.get('/getBoards', (result) => {
        var validBoards = result
                        .map((boardObj) => {
                          boardObj.board = boardObj.board.map((arr) => {
                            //values in board come back as strings, convert to nums
                            return arr.map(Number)
                          })
                          return {
                            name: boardObj.name, 
                            board: boardObj.board}})
                        .filter((boardObj) => {
                          return (boardObj.board.length > 0);
                        })
        this.setState({otherBoards: validBoards});
      });
    });
    $.get('/getBoards', (result) => {
      var validBoards = result
                        .map((boardObj) => {
                          boardObj.board = boardObj.board.map((arr) => {
                            return arr.map(Number)
                          })
                          return {
                            name: boardObj.name, 
                            board: boardObj.board}})
                        .filter((boardObj) => {
                          return (boardObj.board.length > 0);
                        })
      this.setState({otherBoards: validBoards});
    });

  }

  handleBoardNameChange(e) {
    this.setState({boardname: e.target.value})
  }

  // remote person clicks a box? working this out.
  catchServerBoard(serverBoard){
    this.setState({board: serverBoard});
  }


  catchToggle(returnarr){
    //sets the state to update value of clicked button. returnarr is [row,col,val]
    var copy = this.state.board.slice();
    var returnRow = returnarr[0];
    var returnCol = returnarr[1];
    var returnVal = returnarr[2];
    copy[returnRow][returnCol] = (returnVal === 0) ? 1 : 0;
    this.setState({board: copy});

  }

  changeBoard(e) {

    var boardToSet = this.state.otherBoards[e.target.value]
    socket.emit('boardChange', [boardToSet.name, boardToSet.board, e.target.value]);

    this.setState({
      board: boardToSet.board,
      name: boardToSet.name,
      dropdownValue: e.target.value
    })

    // var newBoard = this.state.otherBoards[1];

    // this.setState({
    //   name: newBoard.name,
    //   board: newBoard.board
    // })
  }
  catchTimestamp(e) {
    for (let val of Object.keys(e)) {
      console.log(val);
    }
    console.log(e.timeStamp)

  }

  toggleStop() {
    this.setState({
      looping: false
    })
    worker.postMessage('stop');
    $('.btn').removeClass('activeCol');
  }

  toggleStart() {
    if (this.state.looping) return;
    const bpm = document.getElementById('bpm-slider').value;
    this.setState({
      looping: true,
      bpm: bpm
    }, () => {
      this.playLoop(bufferList)
    })
  }

  playSound(buffer, time) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(context.currentTime + time);
  }

//Plays loop.  input is a buffer list of sounds and a speed variable.
//BPM is beats per minute
  playLoop(bufferList) {
    let counter = 0;
    worker.postMessage({type: 'start', bpm: this.state.bpm})
    worker.onmessage = (e) => {
      console.log('tick')
      let column = $('.col' + counter);
      let prevCol = $('.col' + (counter - 1));
      if (counter === 0) {
        prevCol = $('.col15')
      }
      
      prevCol.removeClass('activeCol');
      column.addClass('activeCol');


      if (e.data === 'tick') {
        let board = this.state.board;
        if (board[0][counter] == 1) {
          this.playSound(bufferList[0], 0);
        }
        if (board[1][counter] == 1) {
          this.playSound(bufferList[1], 0);
        }
        if (board[2][counter] == 1) {
          this.playSound(bufferList[2], 0);
        }
        if (board[3][counter] == 1) {
          this.playSound(bufferList[3], 0);
        }
        counter++
        counter = (counter === 16) ? 0 : counter;
      }
    }
  }

  changeBpm() {
    const bpm = document.getElementById('bpm-slider').value;
    if (this.state.looping) worker.postMessage({type: 'changeBpm', bpm: bpm})
    this.setState({ bpm: bpm })
    socket.emit('changeBpm', bpm);
  }

  remoteChangeBpm(bpm) {
    if (this.state.looping) worker.postMessage({type: 'changeBpm', bpm: bpm});
    this.setState({ bpm: bpm });
    document.getElementById('bpm-slider').value = bpm;
  }

  render() {
		return (
      <div className="mdl-grid">
        <h1 className="mdl-cell mdl-cell--4-col">Buddy Beats</h1>
        <div className="mdl-cell mdl-cell--6-col">
          <form className="saveform" onSubmit = {this.handleSubmit}>    
            <input type="text" className="mdl-textfield__input" ref="textinput" required={true} onChange={this.handleBoardNameChange} placeholder="Name your board!" />
            <input id = "submitButton" type="submit" placeholder="Save Board" required = {true} />
          </form>  
          <Selector dropdownValue={this.state.dropdownValue} boards={this.state.otherBoards} changeBoard={this.changeBoard} />
        </div>
        <Board boxState={this.state.board} toggle={this.toggle} className="mdl-cell mdl-cell--12-col" />
        <Player board={this.state.board} toggleStart={this.toggleStart} toggleStop={this.toggleStop} changeBpm={this.changeBpm} />
        <button onClick={this.catchTimestamp}>click me</button>
			</div>
		)
  }
}

render(<App />, document.getElementById('app'));