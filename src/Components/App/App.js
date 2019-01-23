import React, { Component } from 'react';
import '../../Main.scss';
import MovieText from '../MovieText/MovieText';
import Controls from '../Controls/Controls';
import CardContainer from '../CardContainer/CardContainer';


class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
    return (
      <div className="App">
        <header>
          <Controls />
        </header>
        <main>
          <MovieText />
          <CardContainer />
        </main>
      </div>
    );
  }
}

export default App;
