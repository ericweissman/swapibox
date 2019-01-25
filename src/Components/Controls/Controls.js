import React, { Component } from 'react';
import '../../Main.scss';
import { throws } from 'assert';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: ''
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    this.props.updateActive(event.target.name);
    this.setState({active: event.target.name});

    //if event.target.name === this.state.active
    //add className
  }

  render() {
    
    return(
      <nav>
        <h1>SWapiBox</h1>
        <button name="people" onClick={this.handleClick}>People</button>
        <button name="planets" onClick={this.handleClick}>Planets</button>
        <button name="vehicles" onClick={this.handleClick}>Vehicles</button>
        <button name="favorites" onClick={this.handleClick}>Favorites</button>
      </nav>
    )
  }
}

export default Controls;