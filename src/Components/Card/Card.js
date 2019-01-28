import React from 'react';
import '../../Main.scss';
import PropTypes from 'prop-types'

const Card = (props) => {
  let { people, planets, vehicles } = props.category
  switch (props.active) {
    case 'people':
      return people.map((person) => {
        return (
          <div className="card people-card">
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
        return (
          <div className='card planet-card'>
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
    case 'vehicles':
      return vehicles.map((vehicle) => {
        return (
          <div className="card vehicle-card">
            <h3>{vehicle.name}</h3>
            <p>Model: {vehicle.model}</p>
            <p>Class: {vehicle.class}</p>
            <p>Passengers: {vehicle.passengers}</p>
            <button>Add to Favorites</button>
          </div>
        )
      })
  }
}

Card.propTypes = {
  active: PropTypes.string,
  category: PropTypes.shape({
    films: PropTypes.object,
    people: PropTypes.array,
    planets: PropTypes.array,
    vehicles: PropTypes.array,
    active: PropTypes.string,
    errorStatus: PropTypes.errorStatus
  })
}

export default Card
