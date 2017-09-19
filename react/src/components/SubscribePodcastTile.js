import React from 'react';
import { Link } from 'react-router';

const SubscribePodcastTile = props => {
  let handleClick = () => {
    props.setSelected(props.id)
  }

  let subscribeClick = () => {
    props.subscribePodcast(props.id, props.artUrl, props.artistName, props.collectionName, props.description, props.episodes)
  }
  return (
    <li>
      <div className='tile' onClick={handleClick}>
        <i className={props.className} onClick={handleClick} aria-hidden="true"></i>
        <img src={props.artUrl} alt="podcast art" height="200px"/>
        <p>{props.artistName}</p>
        <p>{props.collectionName}</p>
        <p>{props.description}</p>
        {props.description ? <button onClick={subscribeClick}>Subscribe</button> : ""}
      </div>
    </li>
  )
}

export default SubscribePodcastTile;
