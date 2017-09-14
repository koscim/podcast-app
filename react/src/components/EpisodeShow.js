import React from 'react';
import { browserHistory, Link } from 'react-router';
import ReactPlayer from 'react-player';

const EpisodeShow = (props) => {
  return(
    <div className='container'>
      <h2>{props.name}</h2>
      <h3>Duration: {props.duration}</h3>
      <div className='player-container'>
        <ReactPlayer url={props.feedUrl}
          playing
        />
      </div>

      <div className="button" onClick={browserHistory.goBack} >
        Back
      </div>
    </div>
  )
}

export default EpisodeShow;
