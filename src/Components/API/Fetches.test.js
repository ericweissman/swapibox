import {fetchPeople} from './Fetches'


describe('API', () => {
  describe('fetchPeople', () => {

    beforeEach(() => {
      window.fetch = jest.fn()
    })

    it('should call fetch with the correct params', () => {
      //setup
      const expected = 'https://swapi.co/api/people/';

      //execution
      fetchPeople();

      //expectation
      expect(window.fetch).toHaveBeenCalledWith(expected)
    })
  })
})