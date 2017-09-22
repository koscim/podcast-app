import React from 'react';
import { Link } from 'react-router';

const CategoryPodcastTile = props => {
  let handleClick = () => {
    props.setSelected(props.id)
  }

  let subscribeClick = () => {
    props.subscribePodcast(props.id, props.artUrl, props.artistName, props.collectionName, props.description, props.episodes)
  }
  return (
    <div>
      <div className='podcast-tile one-third column card effect__hover' onClick={handleClick}>
        <div className="card__front">
          <img src={props.artUrl} alt="podcast art" className=""/>
        </div>
        <div className="card__back">
          <span className="small-letters">{props.collectionName}</span>
        </div>
      </div>
      <div className={`tile twelve-columns column ${props.hidden}`} onClick={handleClick}>
        <i className={props.className} onClick={handleClick} aria-hidden="true"></i>
        <img src={props.artUrl} alt="podcast art" height="200px"/>
        <p>{props.artistName}</p>
        <p>{props.collectionName}</p>
        <p>{props.description}</p>
        {props.description ? <button onClick={subscribeClick}>Subscribe</button> : ""}
      </div>
    </div>
  )
}

export default CategoryPodcastTile;
