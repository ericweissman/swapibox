import React from 'react';
import MovieText from './MovieText'
import { shallow } from 'enzyme'

describe('MovieText', () => {
  const films = {title: 'Title', crawl: 'Text', year: '1996'}

  it('should match snapshot', () => {
   const wrapper = shallow(<MovieText films={films} />)
   expect(wrapper).toMatchSnapshot();
  });
}) 