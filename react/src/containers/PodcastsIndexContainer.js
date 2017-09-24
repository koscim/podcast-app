import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import PodcastTile from '../components/PodcastTile';
import Duration from '../components/Duration';

class PodcastsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      podcasts: []
    }
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
          count={podcast.episodes.length}
        />
      )
    })
    return (
      <div className='container homepage'>
        <h1>YOUR SUBSCRIPTIONS</h1>
        <div className="row">
          {podcasts}
        </div>
      </div>
    )
  }
}

export default PodcastsIndexContainer;
