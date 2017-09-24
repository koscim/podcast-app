import React from 'react';
import { Link } from 'react-router';

const EpisodeTile = props => {
  let name = props.name.split(",")[0].replace("[", "").replace("]", "")
  let hours = Math.floor(parseInt(props.duration) / 3600)
  let minutes = Math.floor(parseInt(props.duration) % 3600 / 60)
  let seconds = Math.floor(parseInt(props.duration) % 3600 % 60)
  return (
    <Link to={`/podcasts/${props.podcast_id}/episodes/${props.id}`}>
      <div className='tile'>
        {props.imageUrl ? <img src={props.imageUrl} alt="podcast art" height="200px"/> : ""}
        <p>{name}</p>
        <p>{hours > 0 ? `${hours} h` : ""} {minutes > 0 ? `${minutes} min` : ""} {seconds > 0 ? `${seconds} sec` : ""}</p>
      </div>
    </Link>
  )
}

export default EpisodeTile;
