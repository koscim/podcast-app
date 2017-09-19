import React from 'react';
import { Link } from 'react-router';

const PodcastTile = props => {
  return (
    <Link to={`/podcasts/${props.id}`}>
      <div className='tile'>
        <img src={props.artUrl} alt="podcast art" height="200px"/>
        <p>{props.artistName}</p>
        <p>{props.collectionName}</p>
        <p>{props.description}</p>
      </div>
    </Link>
  )
}

export default PodcastTile;
