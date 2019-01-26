import * as Helper from './Helpers'
import * as Fetch from '../API/Fetches'

// Fetch.fetchData = jest.fn();
describe('Helpers', () => {
  let mockURL = 'fakeURL.biz';
  let mockPeople = [{ name: 'Luke', homeworld: mockURL }, { name: 'Han', homeworld: mockURL }]
  
  describe('addHomeworlds', () => {
    let mockPlanetInfo = {name: 'Mars', population: '12345'};
    beforeEach(() => {
      Fetch.fetchData = jest.fn(() => mockPlanetInfo);
    })
    
    it('should return people with a homeworld and population', async () => {
      const result = await Helper.addHomeworlds(mockPeople);
      const expected = [{ name: 'Luke', homeworld: 'Mars', population: '12345' }, { name: 'Han', homeworld: 'Mars', population: '12345' }]
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
})