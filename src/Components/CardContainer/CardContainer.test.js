import React from 'react';
import CardContainer from './CardContainer';
import { shallow } from 'enzyme';

describe('CardContainer', () => {
  let wrapper;
  let mockActive;
  let mockEmpty = {people: [], planets: [], vehicles: []}
  let mockFull = {
    people: [{ name: 'a', homeworld: 'b', population: 'c', species: 'd' }],
    planets: [{ name: 'a', terrain: 'b', population: 'c', climate: 'd', residents: ['lile'] }],
    vehicles: [{ name: 'a', class: 'b', passengers: 'c' }]
  }

  it('should match the correct snapshot for onload', () => {
    mockActive = ''
    wrapper = shallow(<CardContainer active={mockActive} category={mockEmpty}/>)
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the correct snapshot when a category is selected but it is still fetching', () => {
    mockActive = 'people'
    wrapper = shallow(<CardContainer active={mockActive} category={mockEmpty} />)
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the correct snapshot when a category is selected and fetching is complete', () => {
    mockActive = 'people'
    wrapper = shallow(<CardContainer active={mockActive} category={mockFull} />)
    expect(wrapper).toMatchSnapshot();
  });
   
})