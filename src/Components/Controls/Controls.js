import React, { Component } from 'react';

class Controls extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <h1>SWapiBox</h1>
        <button>People</button>
        <button>Planets</button>
        <button>Vehicles</button>
        <button>Favorites</button>
      </div>
    )
  }
}

export default Controls;