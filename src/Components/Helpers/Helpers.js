import { fetchData } from "../API/Fetches";

//PEOPLE HELPERS
export const addHomeworlds = (people) => {
  const unresolvedPromises = people.map( async (person) =>{
    const homeworldData = await fetchData(person.homeworld);
      return ({
        ...person,
        homeworld: homeworldData.name,
        population: homeworldData.population
      })
  })
  return Promise.all(unresolvedPromises)
}

export const addSpecies = (people) => {
  const unresolvedPromises = people.map( async (person) => {
    if (person.species.length > 0) {
      const speciesData = await fetchData(person.species[0]);
      return ({
        name: person.name,
        homeworld: person.homeworld,
        population: person.population,
        species: speciesData.name
      })
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

export const chooseRandomFilm = async () => {
  const url = 'https://swapi.co/api/films/';
  try {
    const films = await fetchData(url);
    let index = await Math.floor(Math.random() * films.results.length);
    let crawl = await films.results[index];
    return crawl
  } catch (error) {
    return error
  }
}