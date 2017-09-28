import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import TextField from '../components/TextField';
import SubscribePodcastTile from '../components/SubscribePodcastTile';
import LoadingCircle from '../components/LoadingCircle';

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
      podcasts: {
        results: []
      },
      search: "",
      searchCategory: false,
      searchName: false,
      user: {},
      selectedId: null,
      selectedDescription: "",
      selectedEpisodes: [],
      loaded: true,
      fetched: false,
      subscribedPodcasts: []
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleNameCheckboxChange = this.handleNameCheckboxChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.changeState = this.changeState.bind(this)
    this.fetchDescription = this.fetchDescription.bind(this)
    this.subscribePodcast = this.subscribePodcast.bind(this)
  }

  subscribePodcast(id, artUrl, artistName, collectionName, description, episodes, genres, genreIds){
    let subscribePayload = {
      id: id,
      art_url: artUrl,
      artist_name: artistName,
      collection_name: collectionName,
      description: description,
      genres: genres,
      genre_ids: genreIds,
      episodes: episodes
    }
    fetch(`api/v1/users/${this.state.user.id}/podcasts`, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(subscribePayload)
    }).then(response => response.json())
    .then(responseBody => {
      this.setState({ subscribedPodcasts: responseBody.podcasts})
    })
  }

  fetchDescription(id){
    this.setState({ fetched: false })
    fetch(`api/v1/users/${this.state.user.id}/fetch/${id}`, {
       credentials: 'same-origin'
    }).then(response => response.json())
    .then(responseBody => {
      this.setState({ selectedId: id, selectedDescription: responseBody.description, selectedEpisodes: responseBody.episodes_data, fetched: true })
    })
    .catch(error => {
      this.setState({ selectedId: id, selectedDescription: "Error: Unreadable Feed", fetched: true })
    })
  }

  changeState(id){
    if (id != this.state.selectedId) {
      this.fetchDescription(id)
    } else {
      this.setState({ selectedId: null })
    }
  }

  handleInputChange(event){
    this.setState({ search: event.target.value })
  }

  handleNameCheckboxChange(event) {
    if(this.state.searchCategory){
      this.setState({
        searchName: !this.state.searchName,
        searchCategory: false
      })
    } else{
      this.setState({ searchName: !this.state.searchName })
    }
  }

  handleSearch(event) {
    event.preventDefault()
    this.setState({loaded: false})
    fetch(`api/v1/users/${this.state.user.id}/search/${this.state.search}`, {
      credentials: 'same-origin'
    }).then(response => response.json())
    .then(responseBody => {
      this.setState({ podcasts: responseBody, loaded: true  })
    })
  }

  componentDidMount() {
    fetch(`/api/v1/users/`, {
      credentials: 'same-origin'
    }).then(response => response.json())
    .then(responseBody => {
      this.setState({
        user: responseBody.current_user
      })
    })
    .catch((thing) => console.log("so sad"))
    fetch(`/api/v1/podcasts/`, {
      credentials: 'same-origin'
    }).then(response => response.json())
    .then(responseBody => {
      this.setState({
        subscribedPodcasts: responseBody.podcasts
      })
    })
    .catch((thing) => console.log("so sad"))
  }

  render() {
    let podcasts = this.state.podcasts["results"].map(podcast => {
      let subscribed = false;
      this.state.subscribedPodcasts.forEach((subscribedPodcast) => {
        if(subscribedPodcast.collectionId == podcast.collectionId){
          subscribed = true;
        }
      })
      let description;
      let className;
      let fetched;
      if(this.state.selectedId == podcast.collectionId){
        className = "fa fa-minus-square toggleBoxMinus";
        description = this.state.selectedDescription
        fetched = this.state.fetched;
      } else {
        className = "fa fa-plus-square toggleBoxPlus";
        description = "";
        fetched = true;
      }
      return(
        <SubscribePodcastTile
          key={podcast.collectionId}
          id={podcast.collectionId}
          artistName={podcast.artistName}
          collectionName={podcast.collectionName}
          artUrl={podcast.artworkUrl600}
          feedUrl={podcast.feedUrl}
          genres={podcast.genres}
          genreIds={podcast.genreIds}
          className={className}
          description={description}
          setSelected={this.changeState}
          episodes={this.state.selectedEpisodes}
          subscribePodcast={this.subscribePodcast}
          fetched={fetched}
          subscribed={subscribed}
        />
      )
    })
    return(
      <div>
        <div className='sub-container'>
        </div>
        <div className='sub-header'>
          SEARCH
        </div>
        <div className='container homepage'>
          <h2>SEARCH BY NAME</h2>
          <form onSubmit={this.handleSearch}>
            <div>
              <TextField
                content={this.state.search}
                label=""
                name="search"
                handlerFunction={this.handleInputChange}
              />
            </div>
            <div>
              <input className="button" type="submit" value="Submit" />
            </div>
          </form>
          <h1>
            <LoadingCircle
              loaded={this.state.loaded}
            />
          </h1>
          {podcasts}
          <div className="button" onClick={browserHistory.goBack} >
            Back
          </div>
        </div>
      </div>
    )
  }
}

export default SearchContainer;
