import React from 'react';
import { Link } from 'react-router';

const EpisodeTile = props => {
  return (
    <Link to={`/podcasts/${props.podcast_id}/episodes/${props.id}`}>
      <div className='tile'>
        <p>{props.name}</p>
      </div>
    </Link>
  )
}

export default EpisodeTile;
