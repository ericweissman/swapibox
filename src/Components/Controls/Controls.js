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
      <form>
        <h1>SWapiBox</h1>
        <button>People</button>
        <button>Planets</button>
        <button>Vehicles</button>
        <button>Favorites</button>
      </form>
    )
  }
}

export default Controls;