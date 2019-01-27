import React from 'react';
import Card from '../Card/Card'
import '../../Main.scss';
import PropTypes from 'prop-types'
import { uid } from 'uid'

const CardContainer = (props) => {
  let { active, category } = props;
  if (active !== '' && category[active].length > 0) {
    return(
      <div className='card-container'>
        <Card 
          key={uid}
          active={active}
          category={category}
        />
      </div>
    )
  } else if (active !== '' && category[active].length === 0) {
    return(
      <div className='card-container loading'>
        <h1>Loading</h1>
      </div>
    )
  } else {
      return (
        <div className='card-container choose'>
          <h1>CHOOSE A CATEGORY</h1>
        </div>
      )}
  }

CardContainer.propTypes = {
  active: PropTypes.string,
  category: PropTypes.shape({
    films: PropTypes.object,
    people: PropTypes.array,
    planets: PropTypes.array,
    vehicles: PropTypes.array,
    active: PropTypes.string,
    errorStatus: PropTypes.errorStatus
  })
}

export default CardContainer;