import React from 'react';
import Card from './Card'
import { shallow } from 'enzyme';

describe('Card', () => {
  let wrapper;
  let activeMock;
  const categoryMock = {
    people: [{ name: 'a', homeworld: 'b', population: 'c', species: 'd' }],
    planets: [{ name: 'a', terrain: 'b', population: 'c', climate: 'd', residents: ['lile'] }],
    vehicles: [ { name: 'a', class: 'b', passengers: 'c'}]
  }
  
  it('should match the correct snapshot when people is passed as props', () => {
    activeMock = 'people';
    wrapper = shallow(<Card active={activeMock} category={categoryMock} />)
    expect(wrapper).toMatchSnapshot();
  })

  it('should match the correct snapshot when planets is passed as props', () => {
    activeMock = 'planets';
    wrapper = shallow(<Card active={activeMock} category={categoryMock} />)
    expect(wrapper).toMatchSnapshot();
  })

  it('should match the correct snapshot when vehicles is passed as props', () => {
    activeMock = 'vehicles';
    wrapper = shallow(<Card active={activeMock} category={categoryMock} />)
    expect(wrapper).toMatchSnapshot();
  })
})