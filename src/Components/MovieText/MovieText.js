import React from 'react';
import '../../Main.scss';

const MovieText = (props) => {
  const {title, year, crawl} = props.films
  return(
    <aside>
      <h2>{title}</h2>
      <h3>{year}</h3>
      <p>{crawl}</p>
    </aside>
  )
}

export default MovieText;