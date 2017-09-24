import React from 'react';
import { Link } from 'react-router';

const DowntimeTile = props => {
  return (
    <Link to={`/downtimes/${props.id}/edit`}>
      <div className='tile twelve columns'>

        <h1>{props.name.toUpperCase()}</h1>
        <h4>START TIME: {props.startTime}</h4>
        <h4>END TIME: {props.endTime}</h4>
        <h4>DURATION: {props.duration/60} MINUTES</h4>
      </div>
    </Link>
  )
}

export default DowntimeTile;
