import * as Helper from './Helpers'
import * as Fetch from '../API/Fetches'

// Fetch.fetchData = jest.fn();
describe('Helpers', () => {
  let mockHomeworldURL = 'fakeURL.biz';
  let mockSpeciesURL = 'species.com'

  let mockPeople = [{ name: 'Luke', homeworld: mockHomeworldURL, species: [] }, { name: 'Han', homeworld: mockHomeworldURL, species: [mockSpeciesURL] }]

  describe('addHomeworlds', () => {
    let mockPlanetInfo = {name: 'Mars', population: '12345'};
    beforeEach(() => {
      Fetch.fetchData = jest.fn(() => mockPlanetInfo);
    })
    
    it('should return people with a homeworld and population', async () => {
      const result = await Helper.addHomeworlds(mockPeople);
      const expected = [{ name: 'Luke', homeworld: 'Mars', population: '12345', species: [] }, { name: 'Han', homeworld: 'Mars', population: '12345', species: [mockSpeciesURL] }]
      expect(result).toEqual(expected)
    })

    it('should fetch the correct number of times when addHomeworlds is called', () => {
      Helper.addHomeworlds(mockPeople); 
      expect(Fetch.fetchData).toHaveBeenCalledTimes(2)
    })

    it('should return an error is the there is an issue', async () => {
      Fetch.fetchData = jest.fn(() => {
        throw Error('Error fetching, 401')
      });
      const expectedError = Error('Error fetching, 401')
      await expect(Helper.addHomeworlds(mockPeople)).rejects.toThrow(expectedError)
    })
  })

  describe('residentsMap', () => {
    let mockResidentURLs = ['a.com', 'b.com']
    // let mockResidentData = [{name: 'Chewy'}, {name: 'Luke'}]
    let mockResidentData = {name: 'Luke'}

    //given 2 urls, it should return an array of 2 names

    beforeEach(() => {
      Fetch.fetchData = jest.fn(() => mockResidentData)
    })

    it('should call the correct number of fetches', () => {
      Helper.residentsMap(mockResidentURLs);
      expect(Fetch.fetchData).toHaveBeenCalledTimes(2)
    })

    it('should return the names of residents when given 2 urls', async () => {
      const result = await Helper.residentsMap(mockResidentURLs);
      expect(result).toEqual(['Luke', 'Luke'])
    })

  })

  describe('addSpecies', () => {
    let mockPeople = [{ name: 'Luke', homeworld: 'Mars', population: '12345', species: [] }, { name: 'Han', homeworld: 'Mars', population: '12345', species: [mockSpeciesURL] }]
    let mockSpeciesData = { name: 'human' }
    beforeEach(() => {
      Fetch.fetchData = jest.fn(() => mockSpeciesData)
    })

    it('should return people with the correct species if they have a species URL', async () => {
      const result = await Helper.addSpecies(mockPeople);
      const expected = [{ name: 'Luke', homeworld: 'Mars', population: '12345', species: 'unknown' }, { name: 'Han', homeworld: 'Mars', population: '12345', species: 'human' }]
      await expect(result).toEqual(expected)
    })

    it('should fetch the correct number of times when addSpecies is called', () => {
      Helper.addSpecies(mockPeople);
      expect(Fetch.fetchData).toHaveBeenCalledTimes(1)
    })

    it('should throw an error if there is an issue', async () => {
      Fetch.fetchData = jest.fn(() => {
        throw Error('Error fetching, 401')
      });
      const expectedError = Error('Error fetching, 401')
      await expect(Helper.addSpecies(mockPeople)).rejects.toThrow(expectedError)
    })
  })

  describe('chooseRandomFilm', () => {
    let mockMovieURL = 'https://swapi.co/api/films/'
    let mockMovieData = {results: [
      {title: 'A'},
      {title: 'B'}
    ]}
    
    beforeEach(() => {
      Fetch.fetchData = jest.fn(() => mockMovieData)
    })
    it('should fetch using the correct URL', () => {
      Helper.chooseRandomFilm();
      expect(Fetch.fetchData).toHaveBeenCalledWith(mockMovieURL)
    })

    it('it should return the correct film', async () => {
      let result = await Helper.chooseRandomFilm();
      expect(mockMovieData.results).toContain(result)
    })

    it('should throw an error if there is an issue with fetch', async () => {
      const expectedError = 'Error fetching, 401';
      Fetch.fetchData = jest.fn(() => {
        throw Error('Error fetching, 401')
      })
      await expect(Helper.chooseRandomFilm()).rejects.toThrow(expectedError)
    })
  })

  describe('cleanVehicles', () => {
    let mockVehicles = [{
      "name": "Sand Crawler",
      "model": "Digger Crawler",
      "manufacturer": "Corellia Mining Corporation",
      "cost_in_credits": "150000",
      "length": "36.8",
      "max_atmosphering_speed": "30",
      "crew": "46",
      "passengers": "30",
      "cargo_capacity": "50000",
      "consumables": "2 months",
      "vehicle_class": "wheeled",
      "pilots": [],
      "films": [
        "https://swapi.co/api/films/5/",
        "https://swapi.co/api/films/1/"
      ],
      "created": "2014-12-10T15:36:25.724000Z",
      "edited": "2014-12-22T18:21:15.523587Z",
      "url": "https://swapi.co/api/vehicles/4/"
    }]
    let result = [{
      name: 'Sand Crawler',
      model: "Digger Crawler", class: 'wheeled', passengers: '30'
    }]
    it('should returned the cleaned vehicle data', () => {
      Helper.cleanVehicles(mockVehicles)
      expect(Helper.cleanVehicles(mockVehicles)).toEqual(result)
     })
    })
  
})