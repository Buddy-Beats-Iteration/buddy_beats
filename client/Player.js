import React, { Component } from 'react';
// var timeouts = [];

class Player extends Component {
	render() {
		return (
			<div className = "buttonWrapper">
        <button onClick={this.props.toggleStop}>
          <img src="http://www.myiconfinder.com/uploads/iconsets/256-256-707bd27e3a6340527708217c6eadb7c9.png" width="75" height="75"  />
        </button>

        <button onClick={this.props.toggleStart}>
            <img src="http://image.flaticon.com/icons/png/512/0/375.png" width="75" height="75"  />
        </button>

        <input id="bpm-slider" className="mdl-slider mdl-js-slider" type="range"
          min="100" max="500" defaultValue="160" onMouseUp={this.props.changeBpm} onTouchEnd={this.props.changeBpm}></input>
			</div>
		)
	}
}

module.exports = Player;