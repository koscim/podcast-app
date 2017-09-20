import React from 'react';
import { Link } from 'react-router';

const PodcastTile = props => {
  return (
    <Link to={`/podcasts/${props.id}`}>
      <div className='podcast-tile one-third column'>
        <img src={props.artUrl} alt="podcast art" height="200px"/>
      </div>
    </Link>
  )
}

export default PodcastTile;
        // <p>{props.description}</p>
        // <p>{props.artistName}</p>
        // <p>{props.collectionName}</p>
