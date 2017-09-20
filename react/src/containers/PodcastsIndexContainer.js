import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import PodcastTile from '../components/PodcastTile';
import Duration from '../components/Duration';

class PodcastsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      podcasts: [],
      feedUrls: [],
      playing: false,
      volume: 0.8,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      url: null
    }
    // this.translateUrl = this.translateUrl.bind(this)
    this.playPause = this.playPause.bind(this)
    this.stop = this.stop.bind(this)
    this.toggleMuted = this.toggleMuted.bind(this)
    this.onPlay = this.onPlay.bind(this)
    this.onPause = this.onPause.bind(this)
    this.onProgress = this.onProgress.bind(this)
    this.renderLoadButton = this.renderLoadButton.bind(this)
    this.load = this.load.bind(this)
  }

  load(url){
    this.setState({
      url,
      played: 0,
      loaded: 0
    })
  }

  playPause(){
    this.setState({ playing: !this.state.playing })
  }

  stop(){
    this.setState({ url: null, playing: false })
  }

  toggleMuted(){
    this.setState({ muted: !this.state.muted })
  }

  onPlay(){
    this.setState({ playing: true })
  }

  onPause(){
    this.setState({ playing: false })
  }

  onProgress(state){
    this.setState(state)
  }

  renderLoadButton(url,label){
    return(
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }

  componentDidMount() {
    // fetch(`/api/v1/podcasts/`)
    // .then(response => {
    //   if (response.ok) {
    //     return response;
    //   } else {
    //     let errorMessage = `${response.status} (${response.statusText})`,
    //       error = new Error(errorMessage);
    //     throw(error);
    //   }
    // })
    // .then(response => response.json())
    // .then(responseBody => {
    //   this.setState({
    //     podcasts: responseBody.podcasts
    //   })
    // })

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
      this.setState({
        podcasts: responseBody.podcasts
      })
    })
  }
  // componentDidMount() {
  //   fetch('https://itunes.apple.com/search?media=podcast&term=nerdcast')
  //     .then(response => {
  //       if (response.ok) {
  //         return response;
  //       } else {
  //         let errorMessage = `${response.status} (${response.statusText})`,
  //           error = new Error(errorMessage);
  //         throw(error);
  //       }
  //     })
  //     .then(response => response.text())
  //     .then(body => {
  //       console.log(body);
  //       let bodyParsed = JSON.parse(body);
  //       console.log(bodyParsed);
  //       debugger;
  //       this.setState({
  //         feedUrls: this.state.feedUrls.concat(bodyParsed.results[0].feedUrl)
  //       })
  //       this.translateUrl(bodyParsed.results[0].feedUrl)
  //     })
  //     .catch(error => console.error(`Error in fetch: ${error.message}`));
  // }
  //
  // translateUrl(url) {
  //   debugger;
  //   var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  //   fetch(proxyUrl + url)
  //     .then(response => {
  //       let contentType = response.headers.get('content-type')
  //       debugger;
  //       if (response.ok) {
  //         return response;
  //       } else {
  //         let errorMessage = `${response.status} (${response.statusText})`,
  //           error = new Error(errorMessage);
  //         throw(error);
  //       }
  //     })
  //     .then(response => response.text())
  //     .then(body => {
  //       console.log(body);
  //       debugger;
  //     })
  //     .catch(error => console.error(`Error in fetch: ${error.message}`));
  // }

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
        />
      )
    })
    return (
      <div className='container'>
        <h1>Your Subscriptions</h1>
        <div className="row">
          {podcasts}
        </div>
      </div>
    )
  }
}

export default PodcastsIndexContainer;
