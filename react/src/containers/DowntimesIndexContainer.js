import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import DowntimeTile from '../components/DowntimeTile';

class DowntimesIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downtimes: [],
      user: {}
    }
  }

  componentDidMount() {
    fetch(`/api/v1/downtimes`, {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(responseBody => {
      this.setState({
        downtimes: responseBody.downtimes,
        user: responseBody.downtimes
      })
    })
  }

    render() {
      let downtimes = this.state.downtimes.map(downtime => {
        return(
          <DowntimeTile
            key={downtime.downtime.id}
            id={downtime.downtime.id}
            name={downtime.downtime.name}
            startTime={downtime.startTime}
            endTime={downtime.endTime}
            duration={downtime.duration}
          />
        )
      })
      return(
        <div className='container homepage'>
          <h1>YOUR SCHEDULED DOWNTIMES</h1>
          {downtimes}
          <Link to={`/downtimes/new`}>
            <h3>ADD A NEW DOWNTIME</h3>
          </Link>
          <div className="button" onClick={browserHistory.goBack} >
            Back
          </div>
        </div>
      )
    }
}

export default DowntimesIndexContainer;
