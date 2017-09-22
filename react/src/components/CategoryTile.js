import React from 'react';
import { Link } from 'react-router';

const CategoryTile = props => {
  return (
      <Link to={`/categories/${props.id}`}>
        <div className='category-tile twelve columns'>
          <h3>{props.name}</h3>
        </div>
      </Link>
  )
}

export default CategoryTile;
