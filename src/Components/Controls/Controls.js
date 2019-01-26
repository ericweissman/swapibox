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
    const buttons = ['people', 'planets', 'vehicles', 'favorites']
    return(
      <nav>
        <h1>SWapiBox</h1>
        {
          buttons.map((button) => {
            // const btnClass = this.state.active === button ? "active" : "btn"
            return(
              <button className={this.state.active === button ? "active" : "btn"} name={button} onClick={this.handleClick}>{button}</button>
            )
          })
        }
        {/* <button name="people" onClick={this.handleClick}>People</button>
        <button name="planets" onClick={this.handleClick}>Planets</button>
        <button name="vehicles" onClick={this.handleClick}>Vehicles</button>
        <button name="favorites" onClick={this.handleClick}>Favorites</button> */}
      </nav>
    )
  }
}

export default Controls;