import React from 'react';
import { Link } from 'react-router';

const CategoryPodcastTile = props => {
  let handleClick = () => {
    props.setSelected(props.id)
  }

  let subscribeClick = () => {
    props.subscribePodcast(props.id, props.artUrl, props.artistName, props.collectionName, props.description, props.episodes, props.genres, props.genreIds)
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
      <div className={`tile twelve-columns column ${props.hidden}`}>
        <img src={props.artUrl} alt="podcast art" height="200px"/>
        <p>{props.artistName}</p>
        <p>{props.collectionName}</p>
        <p>{props.description}</p>
        {props.description && props.subscribed == false ? <button className='subscribed' onClick={subscribeClick}>Subscribe</button> : ""}
        {props.description && props.subscribed == true ? <button disabled='true'>Subscribed</button> : ""}
      </div>
    </div>
  )
}

export default CategoryPodcastTile;
