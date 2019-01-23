import React, { Component } from 'react';
import '../../Main.scss';
import MovieText from '../MovieText/MovieText'


class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
    return (
      <div className="App">
        <MovieText />
      </div>
    );
  }
}

export default App;
