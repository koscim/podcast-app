import React from 'react';
import { Link } from 'react-router';

const DowntimeTile = props => {
  return (
    <Link to={`/downtimes/${props.id}/edit`}>
      <div className='tile'>
        <h1>{props.name}</h1>
        <p>Start Time: {props.startTime}</p>
        <p>End Time: {props.endTime}</p>
        <p>Duration: {props.duration/60} minutes</p>
      </div>
    </Link>
  )
}

export default DowntimeTile;
