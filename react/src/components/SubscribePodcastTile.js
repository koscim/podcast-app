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
        <div className='inline'>
          <i className={props.className} onClick={handleClick} aria-hidden="true"></i>
          <img src={props.artUrl} alt="podcast art" height="200px"/>
        </div>
        <div className='inline'>
          <h3>{props.collectionName}</h3>
          <h4>{props.artistName}</h4>
        </div>
        <p>{props.description}</p>
        {props.description ? <button onClick={subscribeClick}>Subscribe</button> : ""}
      </div>
    </li>
  )
}

export default SubscribePodcastTile;
