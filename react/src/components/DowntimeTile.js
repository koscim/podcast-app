import React from 'react';
import { Link } from 'react-router';

const DowntimeTile = props => {
  return (
    <Link to={`/downtimes/${props.id}`}>
      <div className='tile'>
        <p>{props.name}</p>
        <p>{props.startTime}</p>
        <p>{props.endTime}</p>
        <p>{props.duration} minutes</p>
      </div>
    </Link>
  )
}

export default DowntimeTile;
