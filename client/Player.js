import React, { Component } from 'react';
// var timeouts = [];

class Player extends Component {
	render() {
		return (
			<div className = "buttonWrapper">
        <button onClick={this.props.toggleStop}>
          <img src="../assets/Stop.svg" width="75" height="75"  />
        </button>

        <button onClick={this.props.toggleStart}>
            <img src="../assets/Play.svg" width="75" height="75"  />
        </button>

        <input id="bpm-slider" className="mdl-slider mdl-js-slider" type="range"
          min="100" max="500" defaultValue="160"></input>
			</div>
		)
	}
}

module.exports = Player;