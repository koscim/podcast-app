import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class HomeShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    let userId = this.props.params.id;
    fetch(`/api/v1/users/${userId}`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        user: responseData.user
      })
    })
  }

  render() {
    return (
      <div className='container'>
        <h1>Welcome back</h1>
        <h1>{this.state.user.first_name}</h1>
        <br />
        <h3>We&#39;ve curated a podcast list for Lunchtime.</h3>
        <br />
        <h3>Here are shorter episodes:</h3>
        <br />
        <h3>Here is a longer episode:</h3>
        <br />
        <h3>Based on your subscriptions, you might enjoy this new podcast:</h3>
        <br />
      </div>
    )
  }
}

export default HomeShowContainer;
