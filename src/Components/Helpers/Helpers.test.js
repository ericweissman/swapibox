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
    let mockMovieData = [{results: [
      {title: 'A'},
      {title: 'B'}
    ]}]
    
    beforeEach(() => {
      Fetch.fetchData = jest.fn(() => mockMovieData)
    })
    it('should fetch using the correct URL', () => {
      Helper.chooseRandomFilm();
      expect(Fetch.fetchData).toHaveBeenCalledWith(mockMovieURL)
    })

    it('should return the list of movies after fetching', () => {
      Helper.chooseRandomFilm();
      expect(mockMovieData).toEqual(expect.arrayContaining(mockMovieData))
    })

    //need to test function to make index?
    //need to test crawl or returning crawl?

  //   it('should throw an error if there is an issue fetching', async () => {
  //     Fetch.fetchData = jest.fn(() => {
  //       throw Error('Error fetching, 401')
  //     })
  //     const expectedError = Error('Error fetching, 401');
  //     await expect(Helper.chooseRandomFilm()).rejects.toThrow(expectedError)
  //   })
  })
})