import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import EpisodeTile from '../components/EpisodeTile';
import EpisodeShow from '../components/EpisodeShow';

class HomeShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      currentTime: "",
      downtime: {},
      episodes: [],
      shorter_episodes: [],
      longer_episodes: []
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
    setInterval( () => {
      this.setState({
        currentTime : new Date().toLocaleString()
      })
    }, 1000)
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
        downtime: responseBody.downtime,
        episodes: responseBody.episodes,
        shorter_episodes: responseBody.shorter_episodes,
        longer_episodes: responseBody.longer_episodes
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
    // let episodes = this.state.episodes.map(episode => {
    //   return(
    //     <EpisodeTile
    //       key={episode.id}
    //       id={episode.id}
    //       name={episode.name}
    //       duration={episode.duration}
    //       feedUrl={episode.feedUrl}
    //       imageUrl={episode.imageUrl}
    //       podcast_id={episode.podcast_id}
    //     />
    //   )
    let shorter_episodes = this.state.shorter_episodes.map(episode => {
      return(
        <EpisodeShow
          key={episode.id}
          id={episode.id}
          name={episode.name}
          duration={episode.duration}
          feedUrl={episode.feedUrl}
        />
      )
    })
    let longer_episodes = this.state.longer_episodes.map(episode => {
      return(
          <EpisodeShow
            key={episode.id}
            id={episode.id}
            name={episode.name}
            duration={episode.duration}
            feedUrl={episode.feedUrl}
          />
      )
    })
    return (
      <div className='container homepage'>
        <h1>Welcome back</h1>
        <h1>{this.state.user.first_name}</h1>
        <br />
        <h3>The time is now: {this.state.currentTime}</h3>
        <button onClick={this.generateSuggestions}>Generate Suggestions</button>
        {this.state.downtime.name ? <h3>We&#39;ve curated a podcast list for {this.state.downtime.name}.</h3> : "" }
        <br />
        {this.state.shorter_episodes.length > 0 ? <h3>Here are shorter episodes:</h3> : ""}
        {shorter_episodes}
        <br />
        <h3>Here is a longer episode:</h3>
        {longer_episodes}
        <br />
        <h3>Based on your subscriptions, you might enjoy this new podcast:</h3>
        <br />
      </div>
    )
  }
}

export default HomeShowContainer;


// <EpisodeTile
//   key={episode.id}
//   id={episode.id}
//   name={episode.name}
//   duration={episode.duration}
//   feedUrl={episode.feedUrl}
//   imageUrl={episode.imageUrl}
//   podcast_id={episode.podcast_id}
// />
