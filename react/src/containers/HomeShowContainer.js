import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class HomeShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      currentTime: "",
      downtime: {}
    }
    this.generateSuggestions = this.generateSuggestions.bind(this)
  }

  componentDidMount() {
    let currentTime = new Date().toLocaleString();
    let timePayload = {
      currentTime: currentTime
    }
    let user;
    fetch(`/api/v1/users/`, {
      credentials: 'same-origin'
    }).then(response => response.json())
    .then(responseBody => {
      user = responseBody.current_user
      this.setState({
        user: responseBody.current_user
      })
    })
    .catch((thing) => console.log("so sad"))
    this.setState({
      currentTime : new Date().toLocaleString()
    })
    // fetch(`/api/v1/users/${this.state.user.id}/recommend`, {
    //   credentials: 'same-origin',
    //   body: JSON.stringify(timePayload)
    // }).then(response => response.json())
    // .then(responseBody => {
    //   this.setState({
    //     user: responseBody.current_user
    //   })
    // })
    // .catch((thing) => console.log("so sad"))
  }

  generateSuggestions(){
    let currentTime = new Date().toLocaleString();
    currentTime = currentTime.replace(/\//g,"-")
    fetch(`/api/v1/users/${this.state.user.id}/recommend/${currentTime}`, {
      credentials: 'same-origin'
    }).then(response => response.json())
    .then(responseBody => {
      this.setState({
        downtime: responseBody.downtime
      })
    })
    .catch((thing) => console.log("so sad"))
  }

  componentDidUpdate(){
    // let currentTime = new Date().toLocaleString();
    // currentTime = currentTime.replace(/\//g,"-")
    // fetch(`/api/v1/users/${this.state.user.id}/recommend/${currentTime}`, {
    //   credentials: 'same-origin'
    // }).then(response => response.json())
    // .then(responseBody => {
    //   this.setState({
    //     user: responseBody.current_user
    //   })
    // })
    // .catch((thing) => console.log("so sad"))
  }

  render() {
    return (
      <div className='container homepage'>
        <h1>Welcome back</h1>
        <h1>{this.state.user.first_name}</h1>
        <br />
        <h3>The time is now: {this.state.currentTime}</h3>
        <button onClick={this.generateSuggestions}>Generate Suggestions</button>
        {this.state.downtime.name ? <h3>We&#39;ve curated a podcast list for {this.state.downtime.name}.</h3> : "" }
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
