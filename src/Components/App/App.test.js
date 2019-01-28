import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import * as Fetch from '../API/Fetches'
import * as Helpers from '../Helpers/Helpers'

describe('App', () => {
  let wrapper
  const defaultState = {
    films: {},
    people: [],
    planets: [],
    vehicles: [],
    favorites: [],
    active: '',
    errorStatus: ''
  }
  const mockCategory1 = 'people'
  const mockCategory2 = 'planets'
  const mockCategory3 = 'vehicles'
  

  beforeEach(() => {
    wrapper = shallow(<App />);
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have the proper default state', () => {
    expect(wrapper.state()).toEqual(defaultState)
  });

  it('should correctly set the active category in state', () => {
    expect(wrapper.state('active')).toEqual('');
    wrapper.instance().updateActive(mockCategory1);
    expect(wrapper.state('active')).toEqual('people');
    wrapper.instance().updateActive(mockCategory2);
    expect(wrapper.state('active')).toEqual('planets');
  });

  it('should call the correct functions when populating data', () => {
    wrapper.instance().addPeople = jest.fn();
    wrapper.instance().addPlanets = jest.fn();
    wrapper.instance().addVehicles = jest.fn();

    wrapper.instance().populateData(mockCategory1);
    expect(wrapper.instance().addPeople).toHaveBeenCalledTimes(1);
    wrapper.instance().populateData(mockCategory2);
    expect(wrapper.instance().addPlanets).toHaveBeenCalledTimes(1);
    wrapper.instance().populateData(mockCategory3);
    expect(wrapper.instance().addVehicles).toHaveBeenCalledTimes(1);
  });

  it('should call the addCrawl method when the component mounts', () => {
    wrapper.instance().addCrawl = jest.fn();
    wrapper.instance().componentDidMount();
    expect(wrapper.instance().addCrawl).toBeCalled();
  });

  it('should add a movie to state when addCrawl is called', async () => {
    const film = {title: 'a', release_date: '1999', opening_crawl: 'texxxt'}
    const filmState = { title: 'a', year: '1999', crawl: 'texxxt' }
    Helpers.chooseRandomFilm = jest.fn(() => film)
    expect(wrapper.state()).toEqual(defaultState);
    await wrapper.instance().addCrawl();
    expect(wrapper.state('films')).toEqual(filmState)
  });

  it('should add people to the people array in state when addPeople is called', async () => {
    const people = [{name: 'Luke', homeworld: 'a', population: 'a', species: 'a', id: '1', favorite: false}]
    Helpers.addSpecies = jest.fn(() => people)
    jest.setTimeout(30000);
    wrapper.setState(defaultState)
    await wrapper.instance().addPeople();
    expect(wrapper.state('people')).toEqual(people)
  });

  it('should add planets to the planets array in state when addPlanets is called', async () => {
    const planets = [{name: 'a', terrain: 'a', population: 'a', climate: 'a', residents: ['a'], id: '2', favorite: false}]
    Helpers.fetchResidents = jest.fn(() => planets)
    jest.setTimeout(30000);
    wrapper.setState(defaultState);
    await wrapper.instance().addPlanets();
    expect(wrapper.state('planets')).toEqual(planets)
  })

  it('should add vehicles to the vehicles array in state when addVehicles is called', async () => {
    const vehicles = [{name: 'a', model: 'b', class: 'c', passengers: 'd', id: '2', favorite: false}];
    Helpers.cleanVehicles = jest.fn(() => vehicles);
    jest.setTimeout(30000);
    wrapper.setState(defaultState);
    await wrapper.instance().addVehicles();
    expect(wrapper.state('vehicles')).toEqual(vehicles)
  })

})


