import React, { Component } from 'react';

class AddSound extends Component {

	
	componentDidMount() {
		const that = this;
		$('#newSoundForm').ajaxForm(function(name) { 
				console.log('this', this)
				console.log('that', that)
        that.props.addSound(name)
        // that.props.handleSubmit()
    });
	}

	// postSound(e) {
	// 	e.preventDefault();
	// 	console.log(e.target)
	// 	// $.post('/sound', this.props.addSound)
	// }

  render() {
  	return (
			<form id="newSoundForm" method="post" encType="multipart/form-data" action="/sound">
		    <input type="file" name="file" />
		    <input type="submit" value="Submit" />
			</form>
  	)
  }
}

module.exports = AddSound;