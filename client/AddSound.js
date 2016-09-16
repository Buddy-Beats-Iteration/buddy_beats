import React, { Component } from 'react';

class AddSound extends Component {

	
	componentDidMount() {
		const that = this;
		$('#newSoundForm').ajaxForm(function(name) { 
				console.log('this', this)
				console.log('that', that)
        that.props.addSound(name)
    });
	}

  render() {
  	return (
	<form id="newSoundForm" method="post" encType="multipart/form-data" action="/sound">
		<input type="file" name="file" />
		<input id="addSoundButton" type="submit" value="AddSound" />
	</form>
  	)
  }
}

module.exports = AddSound;