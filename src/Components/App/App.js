import React, { Component } from 'react';
import '../../Main.scss';
import MovieText from '../MovieText/MovieText';
import Controls from '../Controls/Controls';
import CardContainer from '../CardContainer/CardContainer';


class App extends Component {
  constructor() {
    super();
    this.state = {
      films: {},
      people: [],
      planets: []
    }
  }

//PlANET FETCHES
fetchPlanetData = async () => {
  let allPlanets = [];
  for (let i = 1; i <= 7; i++) {
    const url = `https://swapi.co/api/planets/?page=${i}`;
    const response = await fetch(url);
    const result = await response.json();
    allPlanets.push(...result.results)
  }
  const planets = await this.fetchResidents(allPlanets)
  this.setState({ planets: planets })
}

fetchResidents = (planets) => {
  const unresolvedPromises = planets.map( async planet => {
    if (planet.residents.length > 0) {
     let residentNames = [];
     for (let i = 0; i < planet.residents.length; i++) {
       console.log('fire')
       const response = await fetch(planet.residents[i]);
       const result = await response.json();
       residentNames.push(result.name)
     }
      return ({
        name: planet.name,
        terrain: planet.terrain,
        population: planet.population,
        climate: planet.climate,
        residents: residentNames
      })
    } else {
      return ({
        name: planet.name,
        terrain: planet.terrain,
        population: planet.population,
        climate: planet.climate,
        residents: 'none'
      })
    }
  })
  return Promise.all(unresolvedPromises)
}


//PEOPLE FETCHES
fetchPeopleData = async () => {
  let allPeople = [];
  for (let i = 1; i < 10; i++) {
      const url = `https://swapi.co/api/people/?page=${i}`
      const response = await fetch(url);
      const result = await response.json();
      allPeople.push(...result.results)
    }
    const withHome = await this.fetchHomeworlds(allPeople);
    const people = await this.fetchSpecies(withHome);
    this.setState({ people })
  }

fetchSpecies = (people) => {
  const unresolvedPromises = people.map( async (person) => {
    if (person.species.length > 0) {
      const response =  await fetch(person.species[0]);
      const speciesData = await response.json();
      return ({
          name: person.name,
          homeworld: person.homeworld,
          population: person.population,
          species: speciesData.name
        })
    } else {
      return({
        name: person.name,
        homeworld: person.homeworld,
        population: person.population,
        species: 'unknown'
      })
    }
  })
  return Promise.all(unresolvedPromises)
}

fetchHomeworlds = (people) => {
  const unresolvedPromises = people.map( async (person) => {
      const response = await fetch(person.homeworld);
      const homeworldData = await response.json();
      return ({ 
        ...person, 
        homeworld: homeworldData.name,
        population: homeworldData.population,
      })
  })
  return Promise.all(unresolvedPromises)
}

//MOVIE FETCH
fetchCrawl = async () => {
  let index =  Math.floor(Math.random() * 6 + 1)
  const url = 'https://swapi.co/api/films/';
  const response = await fetch(url);
  const result = await response.json();
  const filmData = await result.results[index];

  this.setState({
    films: {
      title: filmData.title,
      crawl: filmData.opening_crawl,
      year: filmData.release_date
    }});
}


componentDidMount = () =>  {
  // this.fetchPeopleData();
  // this.fetchCrawl();
  this.fetchPlanetData();
}

  render() {
    return (
      <div className="App">
        <header>
          <Controls />
        </header>
        <main>
          <MovieText films={this.state.films} />
          <CardContainer />
        </main>
      </div>
    );
  }
}

export default App;
