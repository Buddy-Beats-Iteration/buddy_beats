import React, { Component } from 'react';

class AddSound extends Component {

  render() {
  	return (
			<form method="post" enctype="multipart/form-data" action="/sound">
		    <input type="file" name="file" />
		    <input type="submit" value="Submit" />
			</form>
  	)
  }
}

module.exports = AddSound;