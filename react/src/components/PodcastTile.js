import React from 'react';
import { Link } from 'react-router';

const PodcastTile = props => {
  return (
    <Link to={`/podcasts/${props.id}`}>
      <div className='podcast-tile one-third column card effect__hover'>
        <div className="card__front">
          <img src={props.artUrl} alt="podcast art" className="" />
        </div>
        <div className="card__back">
        <span className="small-letters">{props.collectionName}</span>
        <br />
        <span className="small-letters">Episodes: {props.count}</span>
        </div>
      </div>
    </Link>
  )
}

export default PodcastTile;
        // <p>{props.description}</p>
        // <p>{props.artistName}</p>
        // <p>{props.collectionName}</p>
