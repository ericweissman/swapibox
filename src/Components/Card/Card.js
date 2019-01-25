import React, { Component } from 'react';
import '../../Main.scss';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
  
  let { people, planets, vehicles} = this.props.category
    switch(this.props.active) {
      case 'people':
        return people.map((person) =>{
          return(
            <div className="people-card">
              <h3>{person.name}</h3>
              <p>Homeworld: {person.homeworld}</p>
              <p>Population: {person.population}</p>
              <p>Species: {person.species}</p>
              <button>Add to Favorites</button>
            </div>
          )
        });
        break;
        
      case 'planets':
        return planets.map((planet) => {
          return(
            <div className='planet-card'>
              <h3>{planet.name}</h3>
              <p>Terrain: {planet.terrain}</p>
              <p>Population: {planet.population}</p>
              <p>Climate: {planet.climate}</p>
              <ul>
                Residents: {
                  planet.residents.map((resident) => {
                    return (
                      <li>{resident}</li>
                    )
                  })
                }
              </ul>
            </div>
          )
        })
    }
  }
}

export default Card