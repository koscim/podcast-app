import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import TextField from '../components/TextField';

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
      podcasts: [],
      search: "",
      searchCategory: false,
      searchName: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCategoryCheckboxChange = this.handleCategoryCheckboxChange.bind(this)
    this.handleNameCheckboxChange = this.handleNameCheckboxChange.bind(this)
  }

  handleInputChange(event){
    this.setState({ search: event.target.value })
  }

  handleCategoryCheckboxChange(event) {
    if(this.state.searchName){
      this.setState({
        searchName: false,
        searchCategory: !this.state.searchCategory
      })
    } else{
      this.setState({ searchCategory: !this.state.searchCategory })
    }
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
    if(this.state.searchCategory){
      fetch(`/api/v1/users/search_category`,{
        credentials: 'same-origin'
      })
      .then(response => {
        if(response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw(error);
        }
      }).then(response => response.json())
      .then(responseBody => {
        debugger;
      })
    } else if(this.state.searchName){
      fetch(`/ap1/v1/users/search_category`, {
        credentials: 'same-origin'
      })
    }
  }

  componentDidMount() {
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
    let podcasts = this.state.podcasts.map(podcast => {
      return(
        <PodcastTile
          artistName={podcast.artist_name}
          collectionName={podcast.collection_name}
        />
      )
    })
    return(
      <div className='container'>
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
                  name="searchCategory"
                  type="checkbox"
                  checked={this.state.searchCategory}
                  onChange={this.handleCategoryCheckboxChange}
                />category
              </label>
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
        {podcasts}
        <div className="button" onClick={browserHistory.goBack} >
          Back
        </div>
      </div>
    )
  }
}

export default SearchContainer;
