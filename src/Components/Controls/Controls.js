import React, { Component } from 'react';
import '../../Main.scss';

class Controls extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return(
      <header>
        <h1>SWapiBox</h1>
        <button>People</button>
        <button>Planets</button>
        <button>Vehicles</button>
        <button>Favorites</button>
      </header>
    )
  }
}

export default Controls;