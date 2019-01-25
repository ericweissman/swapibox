import {fetchData} from './Fetches'


describe('API', () => {
  describe('fetchData', () => {
    beforeEach(() => {
      window.fetch = jest.fn()
    })

    it('should call fetch with the correct params', () => {
      //setup
      const mockURL = 'https://swapi.co/api/people/';

      //execution
      fetchData(mockURL);

      //expectation
      expect(window.fetch).toHaveBeenCalledWith(mockURL)
    })
  })
})