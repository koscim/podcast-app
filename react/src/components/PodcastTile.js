import React from 'react';
import { Link } from 'react-router';

const PodcastTile = props => {
  return (
    <Link to={`/podcasts/${props.id}`}>
      <div className='tile'>
        <p>{props.name}</p>
      </div>
    </Link>
  )
}

export default PodcastTile;
