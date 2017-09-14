import React, { Component } from 'react';
import EpisodeShow from '../components/EpisodeShow';

class EpisodeShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episode:{}
    }
  }

  componentDidMount() {
    let episodeId = this.props.params.episode_id;
    fetch(`/api/v1/podcasts/${this.props.params.podcast_id}/episodes/${episodeId}`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        episode: responseData.episode
      })
    })
  }

  render() {
    return(
      <div className='container'>
        Episode Show!!!!
        <EpisodeShow
          key={this.state.episode.id}
          id={this.state.episode.id}
          name={this.state.episode.name}
          duration={this.state.episode.duration}
          feedUrl={this.state.episode.feedUrl}
        />
      </div>
    )
  }
}

export default EpisodeShowContainer;
