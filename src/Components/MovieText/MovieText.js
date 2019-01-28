import React from 'react';
import '../../Main.scss';
import PropTypes from 'prop-types'


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

MovieText.propTypes = {
  films: PropTypes.shape({
    title: PropTypes.string,
    year: PropTypes.string,
    crawl: PropTypes.string
  })
}

export default MovieText;