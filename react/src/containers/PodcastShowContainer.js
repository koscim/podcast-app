import React, { Component } from 'react';
import PodcastShow from '../components/PodcastShow';
import EpisodeTile from '../components/EpisodeTile';
import { browserHistory, Link } from 'react-router';

class PodcastShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      podcast: {},
      episodes: []
    }
    this.handleUnsubscribe = this.handleUnsubscribe.bind(this)
  }

  handleUnsubscribe() {
    let podcastId = this.props.params.id
    fetch(`/api/v1/podcasts/${podcastId}`, {
      method: 'DELETE',
      credentials: 'same-origin'
    }).then(response => response.json())
    .catch((thing) => console.log("so sad"))
    browserHistory.push('/podcasts')
  }

  componentDidMount() {
    let podcastId = this.props.params.id;
    fetch(`/api/v1/podcasts/${podcastId}`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        podcast: responseData.podcast,
        episodes: responseData.podcast.episodes
      })
    })
  }

  render() {
    let episodes = this.state.episodes.map(episode => {
      return(
        <EpisodeTile
          key={episode.id}
          id={episode.id}
          name={episode.name}
          duration={episode.duration}
          feedUrl={episode.feedUrl}
          imageUrl={episode.imageUrl}
          podcast_id={episode.podcast_id}
        />
      )
    })
    return(
      <div className='container'>
        <div className="button" onClick={this.handleUnsubscribe}>
          Unsubscribe
        </div>
        <PodcastShow
          key={this.state.podcast.id}
          id={this.state.podcast.id}
          name={this.state.podcast.collectionName}
        />
        {episodes}
        <div className="button" onClick={browserHistory.goBack} >
          Back
        </div>
      </div>
    )
  }
}

export default PodcastShowContainer;
