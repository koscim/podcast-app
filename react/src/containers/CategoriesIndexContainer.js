import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import CategoryTile from '../components/CategoryTile';

class CategoriesIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    fetch(`/api/v1/categories/`)
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
        categories: responseBody.categories
      })
    })
  }

  render() {
    let categories = this.state.categories.map(category => {
      return(
        <CategoryTile
          key={category.id}
          id={category.id}
          name={category.name}
        />
      )
    })
    return (
      <div className='container homepage'>
        <h1>GENRES</h1>
        <h2>FIND PODCASTS BY GENRE</h2>
        {categories}
      </div>
    )
  }
}

export default CategoriesIndexContainer;
