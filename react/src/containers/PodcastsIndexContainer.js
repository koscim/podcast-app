import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import PodcastTile from '../components/PodcastTile';
import Duration from '../components/Duration';
import { browserHistory, Link } from 'react-router';

class PodcastsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      podcasts: [],
      hasPodcasts: true
    }
  }

  componentDidMount() {
    fetch(`/api/v1/podcasts`, {
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
      let hasPodcasts;
      if(responseBody.podcasts.length == 0){
        hasPodcasts = false;
      } else {
        hasPodcasts = true;
      }
      this.setState({
        podcasts: responseBody.podcasts,
        hasPodcasts: hasPodcasts
      })
    })
  }

  render() {
    let podcasts = this.state.podcasts.map(podcast => {
      return(
        <PodcastTile
          key={podcast.id}
          id={podcast.id}
          artistName={podcast.artistName}
          collectionName={podcast.collectionName}
          artUrl={podcast.artUrl}
          description={podcast.description}
          count={podcast.episodes.length}
        />
      )
    })
    return (
      <div>
        <div className='sub-container'>
        </div>
        <div className='sub-header'>
          SUBSCRIPTIONS
        </div>
        <div className='container homepage'>
          <div>
            {this.state.hasPodcasts == false ? <p>IT LOOKS LIKE YOU DON&#39;T HAVE ANY SUBSCRIPTIONS. SEARCH FOR PODCASTS BY CLICKING ON + AT THE TOP OR BROWSE BY GENRE  BY CLICKING ON GENRES.</p> : ""}
          </div>
          <div className="center-subscriptions">
            {podcasts}
          </div>
        </div>
      </div>
    )
  }
}

export default PodcastsIndexContainer;

// <h1>YOUR SUBSCRIPTIONS</h1>
