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
      loaded: true
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    // this.handleCategoryCheckboxChange = this.handleCategoryCheckboxChange.bind(this)
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

    })
  }

  fetchDescription(id){
    fetch(`api/v1/users/${this.state.user.id}/fetch/${id}`, {
       credentials: 'same-origin'
    }).then(response => response.json())
    .then(responseBody => {
      // description = responseBody.description
      // if(responseBody.description !== this.state.selectedDescription){
      this.setState({ selectedId: id, selectedDescription: responseBody.description, selectedEpisodes: responseBody.episodes_data })
      // }
    })
    .catch(error => {
      this.setState({ selectedId: id, selectedDescription: "Error: Unreadable Feed" })
    })
    // debugger;
  }

  changeState(id){
    if (id != this.state.selectedId) {
      // this.setState({ selectedId: id })
      this.fetchDescription(id)
    } else {
      this.setState({ selectedId: null })
    }
  }

  handleInputChange(event){
    this.setState({ search: event.target.value })
  }

  // handleCategoryCheckboxChange(event) {
  //   if(this.state.searchName){
  //     this.setState({
  //       searchName: false,
  //       searchCategory: !this.state.searchCategory
  //     })
  //   } else{
  //     this.setState({ searchCategory: !this.state.searchCategory })
  //   }
  // }

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
    loaded: false
    if(this.state.searchCategory){
      // fetch(`/api/v1/users/search_category`,{
      //   credentials: 'same-origin'
      // })
      // .then(response => {
      //   if(response.ok) {
      //     return response;
      //   } else {
      //     let errorMessage = `${response.status} (${response.statusText})`,
      //       error = new Error(errorMessage);
      //     throw(error);
      //   }
      // }).then(response => response.json())
      // .then(responseBody => {
      //   debugger;
      // })
    } else if(this.state.searchName){
      fetch(`api/v1/users/${this.state.user.id}/search/${this.state.search}`, {
        credentials: 'same-origin'
      }).then(response => response.json())
      .then(responseBody => {
        this.setState({ podcasts: responseBody, loaded: true  })
      })
    }
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
    // let categoryId = this.props.params.id;
    // fetch(`/api/v1/categories/${categoryId}`)
    // .then(response => response.json())
    // .then(responseData => {
    //   this.setState({
    //     category: responseData.category,
    //     podcasts: responseData.podcasts
    //   })
    // })
    // fetch(`https://itunes.apple.com/search?term=podcast&genreId=1402&limit=200`)
    // .then(response => response.json())
    // .then(responseData => {
    // })
  }

  render() {
    let podcasts = this.state.podcasts["results"].map(podcast => {
      let description;
      let className;
      if(this.state.selectedId == podcast.collectionId){
        className = "fa fa-minus-square toggleBoxMinus";
        // this.fetchDescription(podcast.collectionId)
        description = this.state.selectedDescription
        // description = "FETCHED";
      } else {
        className = "fa fa-plus-square toggleBoxPlus";
        description = "";
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
        />
      )
    })
    return(
      <div className='container homepage'>
        <form onSubmit={this.handleSearch}>
          <table>
            <tbody>
              <TextField
                content={this.state.search}
                label="Search"
                name="search"
                handlerFunction={this.handleInputChange}
              />
            </tbody>
            <tbody>
              <label>
                <input
                  name="searchName"
                  type="checkbox"
                  checked={this.state.searchName}
                  onChange={this.handleNameCheckboxChange}
                />name
              </label>
            </tbody>
            <tbody>
              <input className="button" type="submit" value="Submit" />
            </tbody>
          </table>
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
    )
  }
}

export default SearchContainer;

// <tbody>
//   <label>
//     <input
//       name="searchCategory"
//       type="checkbox"
//       checked={this.state.searchCategory}
//       onChange={this.handleCategoryCheckboxChange}
//     />category
//   </label>
// </tbody>
