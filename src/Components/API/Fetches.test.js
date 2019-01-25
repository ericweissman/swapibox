import {fetchData} from './Fetches'


describe('API', () => {
  describe('fetchData', () => {

    beforeEach(() => {
      window.fetch = jest.fn()
    })

    it('should call fetch with the correct params', () => {
      //setup
      const expected = 'https://swapi.co/api/people/';

      //execution
      fetchData(expected);

      //expectation
      expect(window.fetch).toHaveBeenCalledWith(expected)
    })
  })
})