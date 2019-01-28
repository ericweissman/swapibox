import React, { Component } from 'react';
import '../../Main.scss';
import PropTypes from 'prop-types'
import { throws } from 'assert';
import { uid } from 'uid'


class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: ''
    }
  }

  handleClick = (event) => {
    const category = event.target.name
    event.preventDefault();
    this.props.populateData(category);
    this.props.updateActive(category);
    this.setState({active: category});
  }

  render() {
    const buttons = ['people', 'planets', 'vehicles', 'favorites']
    let { favorites } = this.props
    return(
      <nav>
        <h1>SWapiBox</h1>
        <div className="btn-container">
          {
            buttons.map((button) => {
              if (button !== 'favorites') {
                return (
                  <button className={this.state.active === button ? "btn active" : "btn"} name={button} onClick={this.handleClick}>{button}</button>
                )
              } else {
                return (
                  <button className={this.state.active === button ? "btn active" : "btn"} name={button} onClick={this.handleClick}>{button} {favorites.length}</button>
              )}
          })
        }
        </div>
      </nav>
    )
  }
}

Controls.propTypes = {
  populateData: PropTypes.func,
  updateActive: PropTypes.func
}

export default Controls;