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
        podcasts: responseData.category.podcasts
      })
    })
  }

  render() {
    let podcasts = this.state.podcasts.map(podcast => {
      return(
        <PodcastTile
          key={podcast.id}
          id={podcast.id}
          name={podcast.name}
        />
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
