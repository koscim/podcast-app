import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import EpisodeTile from '../components/EpisodeTile';
import EpisodeShow from '../components/EpisodeShow';
import LoadingCircle from '../components/LoadingCircle';

class HomeShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      currentTime: "",
      downtime: {},
      episodes: [],
      shorter_episodes: [],
      longer_episodes: [],
      loaded: true
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
        user: responseBody.current_user,
      })
    })
    .catch((thing) => console.log("so sad"))
    this.intervalID = setInterval(() => this.tick(), 1000);
    // setInterval( () => {
    //   this.setState({
    //     currentTime : new Date().toLocaleString()
    //   })
    // }, 1000)
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

  tick() {
    this.setState({
      currentTime : new Date().toLocaleString()
    })
  }

  componentWillUnmount(){
    clearInterval(this.intervalID)
  }

  generateSuggestions(){
    this.setState({ loaded: false })
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
        longer_episodes: responseBody.longer_episodes,
        loaded: true
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
    let episodes = this.state.episodes.map(episode => {
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
        <h1>WELCOME BACK</h1>
        {this.state.user.first_name ? <h1>{this.state.user.first_name.toUpperCase()}</h1> : ""}
        <div className="border-underline"></div>
        <br />
        <h3>THE CURRENT TIME IS:</h3>
        {this.state.currentTime != "" ? <h3>{this.state.currentTime}</h3> : <h3><br /></h3>}
        <h4>CLICK BELOW TO GENERATE YOUR CURATED LIST OF EPISODES</h4>
        <button className="centered" onClick={this.generateSuggestions}>Generate Suggestions</button>
        <br />
        <h1>
          <LoadingCircle
            loaded={this.state.loaded}
          />
        </h1>
        {this.state.downtime.name ? <h3>WE&#39;VE CURATED A PODCAST LIST FOR <span className="bold-outline">{this.state.downtime.name.toUpperCase()}</span>.</h3> : "" }
        {this.state.episodes.length == 3 ? <p>YOU HAVEN&#39;T SCHEDULED A DOWNTIME FOR YOUR CURRENT TIME. HERE ARE SOME EPISODES FROM YOUR SUBSCRIPTIONS TO LISTEN TO ANYWAY.</p> : "" }
        <br />
        {this.state.shorter_episodes.length > 0 ? <h3>HERE ARE SHORTER EPISODES: </h3> : ""}
        {shorter_episodes}
        {this.state.episodes.length == 3 ? episodes : "" }
        <br />
        {this.state.longer_episodes.length > 0 ? <h3>HERE IS A LONGER EPISODE: </h3> : ""}
        {longer_episodes}
        <br />
        {this.state.longer_episodes.length > 0 ? <h3>Based on your subscriptions, you might enjoy this new podcast:</h3> : ""}
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
