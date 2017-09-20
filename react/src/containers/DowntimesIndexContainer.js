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
        downtimes: responseBody.downtimes
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
        <div className='container'>
          Downtime Show!!!
          {downtimes}
          <div className="button" onClick={browserHistory.goBack} >
            Back
          </div>
        </div>
      )
    }
}

export default DowntimesIndexContainer;
