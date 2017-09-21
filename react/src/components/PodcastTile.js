import React from 'react';
import { Link } from 'react-router';

const PodcastTile = props => {
  return (
    <Link to={`/podcasts/${props.id}`}>
      <div className='podcast-tile one-third column card effect__hover'>
        <div className="card__front">
          <img src={props.artUrl} alt="podcast art" className="container" />
        </div>
        <div className="card__back">
          <h3>{props.collectionName}</h3>
          <h4>Episodes: {props.count}</h4>
        </div>
      </div>
    </Link>
  )
}

export default PodcastTile;
        // <p>{props.description}</p>
        // <p>{props.artistName}</p>
        // <p>{props.collectionName}</p>
