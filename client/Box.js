import React, { Component } from 'react';

class Box extends Component {

  render() {
    var colorsArr = ["#83BBBC", "EEB937"];
    var boxStyle = {
      paddingBottom: "calc(100%/17)",
      width: "calc(100%/17)",
      backgroundColor: colorsArr[this.props.boxState[this.props.row][this.props.col] ]
    }

		return (
			<button style = {boxStyle} className = {`btn col${this.props.col}`} onClick={this.props.toggle.bind(null,this.props.row, this.props.col)}>
			</button>
		)
  }
}

module.exports = Box;