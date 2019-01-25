import React, { Component } from 'react';
import '../../Main.scss';
import MovieText from '../MovieText/MovieText';
import Controls from '../Controls/Controls';
import CardContainer from '../CardContainer/CardContainer';
import { fetchPeople, fetchData } from '../API/Fetches'


class App extends Component {
  constructor() {
    super();
    this.state = {
      films: {},
      people: [],
      planets: [],
      vehicles: [],
      active: 'people',
      errorStatus: ''
    }
  }

//PlANET FETCHES
fetchPlanetData = async () => {
  let allPlanets = [];
  const url = `https://swapi.co/api/planets/`;
  const planetData = await fetchData(url);
  allPlanets.push(...planetData.results)
  const planets = await this.fetchResidents(allPlanets)
  this.setState({ planets: planets })
}

fetchResidents = (planets) => {
  const unresolvedPromises = planets.map( async planet => {
    if (planet.residents.length > 0) {
     let residentNames = [];
     for (let i = 0; i < planet.residents.length; i++) {
       const residentData = await fetchData(planet.residents[i]);
       residentNames.push(residentData.name)
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
        residents: ['none']
      })
    }
  })
  return Promise.all(unresolvedPromises)
}


//PEOPLE FETCHES
fetchPeopleData = async () => {
  let allPeople = [];
  const url = `https://swapi.co/api/people/`

  try {
    const peopleData = await fetchData(url);
    allPeople.push(...peopleData.results)
    const withHome = await this.fetchHomeworlds(allPeople);
    const people = await this.fetchSpecies(withHome);
    this.setState({ people })
  } catch (error) {
    this.setState({errorStatus: error})
  }
}

fetchSpecies = (people) => {
  const unresolvedPromises = people.map( async (person) => {
    if (person.species.length > 0) {
      const speciesData =  await fetchData(person.species[0]);
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
      const homeworldData = await fetchData(person.homeworld);
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
  const filmData = await fetchData(url);
  const crawlData = await filmData.results[index];

  this.setState({
    films: {
      title: crawlData.title,
      crawl: crawlData.opening_crawl,
      year: crawlData.release_date
    }});
}


componentDidMount = () =>  {
  this.fetchPeopleData();
  this.fetchCrawl();
  this.fetchPlanetData();
}

  render() {
    const { films, planets, people, vehicles, active } = this.state;
    return (
      <div className="App">
        <header>
          <Controls />
        </header>
        <main>
          <MovieText films={films}/>
          <CardContainer 
            active={active}
            category={this.state}
            />
        </main>
      </div>
    );
  }
}

export default App;
