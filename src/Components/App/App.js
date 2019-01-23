import React, { Component } from 'react';
import '../../Main.scss';
import MovieText from '../MovieText/MovieText';
import Controls from '../Controls/Controls';
import CardContainer from '../CardContainer/CardContainer';


class App extends Component {
  constructor() {
    super();
    this.state = {
      people: [],
    }
  }

fetchPeopleData() {
  fetch('https://swapi.co/api/people/?page=1')
    .then(response => response.json())
    .then(people => this.fetchHomeworlds(people.results))
    .then(peopleWithHomes => this.fetchSpecies(peopleWithHomes))
    .then(result => console.log(result))
  }

fetchSpecies(people) {
  const unresolvedPromises = people.map((person) => {
    return fetch(person.species)
      .then(response => response.json())
      .then(speciesData => ({
        ...person,
        species: speciesData.name
      }))
  })

  return Promise.all(unresolvedPromises)
}

fetchHomeworlds(people) {
  const unresolvedPromises = people.map((person) => {
    return fetch(person.homeworld)
      .then(response => response.json())
      .then(homeworldData => ({ 
        ...person, 
        homeworld: homeworldData.name,
        population: homeworldData.population,
      }))
  })

  return Promise.all(unresolvedPromises)
}



  async componentDidMount() {
    this.fetchPeopleData();
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
