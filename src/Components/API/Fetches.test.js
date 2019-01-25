import {fetchData} from './Fetches'


describe('API', () => {
  let mockURL
  let mockData
  describe('fetchData', () => {
    beforeEach(() => {
      window.fetch = jest.fn()
       mockURL = 'https://swapi.co/api/people/';
       mockData = [{}, {}]
    })

    it('should call fetch with the correct params', () => {
      //setup
      // const mockURL = 'https://swapi.co/api/people/';

      //execution
      fetchData(mockURL);

      //expectation
      expect(window.fetch).toHaveBeenCalledWith(mockURL)
    })
  })

  it('should return correct data if everything is OK', async () => {
    //setup 
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockData)
    }))
    //execution and expectation
    const results = await fetchData(mockURL)
    expect(results).toEqual(mockData)


  })

  it('should throw an error if fetch is not ok', async () => {
    //setup
    // const mockURL = 'https://swapi.co/api/people/';
    const expectedError = Error('Error fetching, 401')
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 401,
      ok: false,
    }))

    //execution
    await expect(fetchData(mockURL)).rejects.toEqual(expectedError)
  })
})