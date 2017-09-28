import React from 'react';
import { Link } from 'react-router';
import LoadingCircle from '../components/LoadingCircle';

const SubscribePodcastTile = props => {
  let handleClick = () => {
    props.setSelected(props.id)
  }

  let subscribeClick = () => {
    props.subscribePodcast(props.id, props.artUrl, props.artistName, props.collectionName, props.description, props.episodes, props.genres, props.genreIds)
  }
  return (
    <div className='tile'>
      <div className='tile-content' onClick={handleClick}>
        <img src={props.artUrl} alt="podcast art" height="200px"/>
        <p>{props.collectionName}</p>
        <p>{props.artistName}</p>
      </div>
      <h1>
        <LoadingCircle
          loaded={props.fetched}
        />
      </h1>
      <p>{props.description}</p>
      {props.description && props.subscribed == false ? <button className='subscribed' onClick={subscribeClick}>Subscribe</button> : ""}
      {props.description && props.subscribed == true ? <button disabled='true'>Subscribed</button> : ""}
    </div>
  )
}

export default SubscribePodcastTile;
// <i className={props.className} onClick={handleClick} aria-hidden="true"></i>

// <Link to={`/podcasts/${props.podcast_id}/episodes/${props.id}`}>
//   <div className='tile'>
//     <div className='tile-content'>
//       {props.imageUrl ? <img src={props.imageUrl} alt="podcast art" height="200px"/> : ""}
//       <p>{name}</p>
//       <p>{hours > 0 ? `${hours} h` : ""} {minutes > 0 ? `${minutes} min` : ""} {seconds > 0 ? `${seconds} sec` : ""}</p>
//     </div>
//   </div>
// </Link>
