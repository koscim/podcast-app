import React, { Component } from 'react';
import CategoryShow from '../components/CategoryShow';
import { browserHistory, Link } from 'react-router';
import PodcastTile from '../components/PodcastTile';

class CategoryShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
      podcasts: []
    }
  }

  componentDidMount() {
    let categoryId = this.props.params.id;
    fetch(`/api/v1/categories/${categoryId}`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        category: responseData.category,
        podcasts: responseData.podcasts
      })
    })
    // fetch(`https://itunes.apple.com/search?term=podcast&genreId=1402&limit=200`)
    // .then(response => response.json())
    // .then(responseData => {
    // })
  }

  render() {
    let podcasts = this.state.podcasts.map(podcast => {
      // let podcast_string = <ul><li>Artist Name: {podcast.artist_name}</li><li>Podcast Name: {podcast.collection_name}</li></ul>
      return(
        // podcast_string
        <PodcastTile
          artistName={podcast.artist_name}
          collectionName={podcast.collection_name}
        />
        // <PodcastTile
        //   key={podcast.id}
        //   id={podcast.id}
        //   name={podcast.name}
        // />
      )
    })
    return(
      <div className='container'>
        Category Show!!!!
        <CategoryShow
          key={this.state.category.id}
          id={this.state.category.id}
          name={this.state.category.name}
        />
        {podcasts}
        <div className="button" onClick={browserHistory.goBack} >
          Back
        </div>
      </div>
    )
  }
}

export default CategoryShowContainer;
