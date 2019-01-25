import React, { Component } from 'react';
import '../../Main.scss';
import MovieText from '../MovieText/MovieText';
import Controls from '../Controls/Controls';
import CardContainer from '../CardContainer/CardContainer';
import { fetchData } from '../API/Fetches'
import { addHomeworlds, addSpecies, chooseRandomFilm } from '../Helpers/Helpers'


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
    const withHome = await addHomeworlds(allPeople);
    const people = await addSpecies(withHome);
    this.setState({ people })
  } catch (error) {
    this.setState({errorStatus: error})
  }
}


addCrawl = async () => {
  const movie = await chooseRandomFilm();
  // if movie !== error 
  this.setState({
    films: {
      title: movie.title,
      crawl: movie.opening_crawl,
      year: movie.release_date
    }});
}


componentDidMount = () =>  {
  this.addCrawl();
  this.fetchPeopleData();
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
