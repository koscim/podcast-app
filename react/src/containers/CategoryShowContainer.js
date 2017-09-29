import React, { Component } from 'react';
import CategoryShow from '../components/CategoryShow';
import { browserHistory, Link } from 'react-router';
import PodcastTile from '../components/PodcastTile';
import CategoryPodcastTile from '../components/CategoryPodcastTile';
import LoadingCircle from '../components/LoadingCircle';

class CategoryShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
      podcasts: [],
      selectedId: null,
      selectedDescription: "",
      selectedEpisodes: [],
      user: {},
      loaded: false
    }
    this.changeState = this.changeState.bind(this)
    this.fetchDescription = this.fetchDescription.bind(this)
    this.subscribePodcast = this.subscribePodcast.bind(this)
  }

  changeState(id){
    if (id != this.state.selectedId) {
      this.fetchDescription(id)
    } else {
      this.setState({ selectedId: null })
    }
  }

  fetchDescription(id){
    fetch(`/api/v1/users/${this.state.user.id}/fetch/${id}`, {
       credentials: 'same-origin'
    }).then(response => response.json())
    .then(responseBody => {
      this.setState({ selectedId: id, selectedDescription: responseBody.description, selectedEpisodes: responseBody.episodes_data })
    })
    .catch(error => {
      this.setState({ selectedId: id, selectedDescription: "Error: Unreadable Feed" })
    })
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
    fetch(`/api/v1/users/${this.state.user.id}/podcasts`, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(subscribePayload)
    }).then(response => response.json())
    .then(responseBody => {

    })
  }

  componentDidMount() {
    let categoryId = this.props.params.id;
    fetch(`/api/v1/categories/${categoryId}`, {
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        category: responseData.category,
        podcasts: responseData.podcasts,
        user: responseData.current_user,
        loaded: true
      })
    })
  }

  render() {
    let podcasts = this.state.podcasts.map(podcast => {
      let description;
      let className;
      let hidden;
      if(this.state.selectedId == podcast.collectionId){
        className = "fa fa-minus-square toggleBoxMinus";
        hidden = "shown"
        description = this.state.selectedDescription
      } else {
        hidden = "hidden"
        className = "fa fa-plus-square toggleBoxPlus";
        description = "";
      }
      return(
        <CategoryPodcastTile
          key={podcast.collectionId}
          id={podcast.collectionId}
          artistName={podcast.artistName}
          collectionName={podcast.collectionName}
          artUrl={podcast.artUrl}
          feedUrl={podcast.feedUrl}
          genres={podcast.genres}
          genreIds={podcast.genreIds}
          className={className}
          description={description}
          setSelected={this.changeState}
          episodes={this.state.selectedEpisodes}
          subscribePodcast={this.subscribePodcast}
          hidden={hidden}
        />
      )
    })
    return(
      <div>
        <div className='sub-container'>
        </div>
        <div className='sub-header'>
          GENRES
        </div>
        <div className='container homepage'>
          <h1>
            <LoadingCircle
              loaded={this.state.loaded}
            />
          </h1>
          <CategoryShow
            key={this.state.category.id}
            id={this.state.category.id}
            name={this.state.category.name}
          />
          <div className='podcast-container row'>
            {podcasts}
          </div>
        </div>
      </div>
    )
  }
}

export default CategoryShowContainer;
