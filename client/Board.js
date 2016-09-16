import React, { Component } from 'react';
import Box from './Box';

class Board extends Component {

  render() {

    //numcols (# of columns) * 150px width = boardWidth
    //150px column width is set on Box.js
    let boxes = [];
    let numrows = this.props.boxState.length;
    let numcols = 16;
    // let boardWidth = (numcols * 150 + 20).toString(); 
    
    let boardStyle = {
      
      // display: "inline-block",
      // text-align: "center"
      // boardWidth + 'px'
    };

    let keyCount = 0;
    for (var r = 0; r < numrows; r++){
      for (var c = 0; c < numcols; c++){
        boxes.push(<Box boxState = {this.props.boxState} key={keyCount++} row = {r} col = {c} toggle = {this.props.toggle}/>); 
      }   
    }
		return (
			<div className = "board" >
        {boxes}
			</div>
		)
  }
}

module.exports = Board;