import React from 'react';
import { shallow } from 'enzyme';
import Controls from './Controls'

describe('Controls', () => {
  const updateActiveMock = jest.fn();
  const populateDataMock = jest.fn();
  const mockFavorites = [1, 2];
  const expectedState = {active: ''}
  const mockEvent = { preventDefault: jest.fn(), target: {name: 'people'}}
  const mockEvent2 = { preventDefault: jest.fn(), target: {name: 'planets'}}
  let wrapper;
  beforeEach(() => {
     wrapper = shallow(<Controls updateActive={updateActiveMock} populateData={populateDataMock} favorites={mockFavorites} />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()  
  });

  it('should have  the correct default state', () => {
    expect(wrapper.state()).toEqual(expectedState)
  })

  it('should call the the prop functions the correct times when handleClick is called', () => {
    wrapper.instance().handleClick(mockEvent)
    expect(updateActiveMock).toHaveBeenCalledTimes(1);
    expect(populateDataMock).toHaveBeenCalledTimes(1);
  })

  it('should call the prop functions with the correct params', () => {
    wrapper.instance().handleClick(mockEvent)
    expect(updateActiveMock).toHaveBeenCalledWith(mockEvent.target.name)
    expect(populateDataMock).toHaveBeenCalledWith(mockEvent.target.name)
  }) 

  it('should reset state when a button is clicked', () => {
    expect(wrapper.state()).toEqual(expectedState)
    wrapper.instance().handleClick(mockEvent)
    expect(wrapper.state()).toEqual({active: 'people'})
    wrapper.instance().handleClick(mockEvent2)
    expect(wrapper.state()).toEqual({active: 'planets'})
  })

})