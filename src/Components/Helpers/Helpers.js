import { fetchData } from "../API/Fetches";

//PEOPLE CLEANERS
export const addHomeworlds = (people) => {
  const unresolvedPromises = people.map( async (person) =>{
    try {
      const homeworldData = await fetchData(person.homeworld);
      return ({
        ...person,
        homeworld: homeworldData.name,
        population: homeworldData.population
      })
    } catch (error){
      throw error
    }
  })
  return Promise.all(unresolvedPromises)
}

export const addSpecies = (people) => {
  const unresolvedPromises = people.map( async (person) => {
    if (person.species.length > 0) {
      try {
        const speciesData = await fetchData(person.species[0]);
        return ({
          name: person.name,
          homeworld: person.homeworld,
          population: person.population,
          species: speciesData.name
        })
      } catch (error) {
        throw (error)
      }

    } else {
      return ({
        name: person.name,
        homeworld: person.homeworld,
        population: person.population,
        species: 'unknown'
      })
    }
  })
  return Promise.all(unresolvedPromises)
}

//PLANET CLEANERS
export const fetchResidents = (planets) => {
  const unresolvedPromises = planets.map(async planet => {
    if (planet.residents.length > 0) {
      const residents = await residentsMap(planet.residents)
      return ({
        name: planet.name,
        terrain: planet.terrain,
        population: planet.population,
        climate: planet.climate,
        residents
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

const residentsMap = (residents) => {
  const unresolvedPromises = residents.map( async (resident) => {
     const residentData = await fetchData(resident);
     return residentData.name
  })
  return Promise.all(unresolvedPromises);
}


//VEHICLE CLEANERS
export const cleanVehicles = (vehicles) => {
  return vehicles.map((vehicle) => {
    return {
      name: vehicle.name,
      model: vehicle.model,
      class: vehicle.vehicle_class,
      passengers: vehicle.passengers
    }
  })
}

export const chooseRandomFilm = async () => {
  const url = 'https://swapi.co/api/films/';
  try {
    const films = await fetchData(url);
    let index = await Math.floor(Math.random() * films.results.length);
    let crawl = await films.results[index];
    return crawl
  } catch (error) {
    throw error
  }
}