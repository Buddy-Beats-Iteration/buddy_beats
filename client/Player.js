import React, { Component } from 'react';
import { render } from 'react-dom';
var timeouts = [];

class Player extends Component {
	constructor() {
		super();
    this.toggleStop = this.toggleStop.bind(this);
    this.toggleStart = this.toggleStart.bind(this);

    this.state = {
      looping: false,
      bpm: 160
    }
	}

//Plays loop.  input is a buffer list of sounds and a speed variable.
//BPM is beats per minute
  playLoop(bufferList, bpm, board, loop = 0) {
    let counter = 0;
    worker.postMessage({type: 'start', bpm: this.state.bpm})
    worker.onmessage = (e) => {
      console.log('tick')
      if (e.data === 'tick') {
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

  playSound(buffer, time) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(context.currentTime + time);
  }

  //toggle stop terminates the loop.  Audio sounds cued up will continue to play.
  //Will terminate at the end of the loop playing.
  toggleStop() {
    this.setState({
      looping: false
    })
    worker.postMessage('stop');
  }

  toggleStart() {
    if (this.state.looping) return;
    const bpm = document.getElementById('bpm-slider').value;
    this.setState({
      looping: true,
      bpm: bpm
    }, () => {
      this.playLoop(bufferList, this.state.bpm, this.props.board)
    })
  }

  componentDidUpdate() {
    if (this.state.looping) document.getElementById('bpm-slider').setAttribute('disabled', 'disabled');
    else document.getElementById('bpm-slider').removeAttribute('disabled');
  }

	render() {
		return (
			<div className = "buttonWrapper">

        <button onClick={this.toggleStop}>
          <img src="../assets/Stop.svg" width="75" height="75"  />
        </button>

        <button onClick={this.toggleStart}>
            <img src="../assets/Play.svg" width="75" height="75"  />
        </button>

        <input id="bpm-slider" className="mdl-slider mdl-js-slider" type="range"
          min="100" max="500" defaultValue="160"></input>

			</div>
		)
	}
}

module.exports = Player;