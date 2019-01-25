import React from 'react';
import Card from '../Card/Card'
import '../../Main.scss';

const CardContainer = (props) => {
  let { active, category } = props;
  if (active !== '') {
    return(
      <div className='card-container'>
        <Card 
          active={active}
          category={category}
        />
      </div>
    )} else {
      return (
        <div className='card-container'>
          <h1>CHOOSE A CATEGORY</h1>
        </div>
      )}
  }

export default CardContainer;