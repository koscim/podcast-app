import React from 'react';
import { Link } from 'react-router';

const EpisodeTile = props => {
  return (
    <Link to={`/podcasts/${props.podcast_id}/episodes/${props.id}`}>
      <div className='tile'>
        {props.imageUrl ? <img src={props.imageUrl} alt="podcast art" height="200px"/> : ""}
        <p>{props.name}</p>
      </div>
    </Link>
  )
}

export default EpisodeTile;
