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
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(id){
    fetch(`/api/v1/users/${this.state.user.id}/downtimes/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin'
    }).then(response => response.json())
    .catch((thing) => console.log("so sad"))
    this.setState({ downtimes: this.state.downtimes.filter(downtime => downtime.id !== id)})
  }

  componentWillMount() {
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
        user: responseBody.user
      })
    })
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
        user: responseBody.user
      })
    })
  }

    render() {
      let downtimes = this.state.downtimes.map(downtime => {
        return(
          <DowntimeTile
            key={downtime.id}
            id={downtime.id}
            name={downtime.downtime}
            startTime={downtime.startTime}
            endTime={downtime.endTime}
            duration={downtime.duration}
            handleDelete={this.handleDelete}
          />
        )
      })
      return(
        <div>
          <div className='sub-container'>
          </div>
          <div className='sub-header'>
            DOWNTIMES
          </div>
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
        </div>
      )
    }
}

export default DowntimesIndexContainer;
