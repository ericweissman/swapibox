import React from 'react';
import Card from '../Card/Card'
import '../../Main.scss';

const CardContainer = (props) => {
  let { active, category } = props;
  if (active !== '' && category[active].length > 0) {
    return(
      <div className='card-container'>
        <Card 
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

export default CardContainer;