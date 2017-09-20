import React from 'react';
import { Link } from 'react-router';

const EpisodeTile = props => {
  let name = props.name.split(",")[0].replace("[", "").replace("]", "")
  return (
    <Link to={`/podcasts/${props.podcast_id}/episodes/${props.id}`}>
      <div className='tile'>
        {props.imageUrl ? <img src={props.imageUrl} alt="podcast art" height="200px"/> : ""}
        <p>{name}</p>
      </div>
    </Link>
  )
}

export default EpisodeTile;
