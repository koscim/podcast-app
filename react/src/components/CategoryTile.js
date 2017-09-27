import React from 'react';
import { Link } from 'react-router';

const CategoryTile = props => {
  let name = props.name.toUpperCase()
  return (
      <Link to={`/categories/${props.id}`}>
        <div className='category-tile twelve columns'>
          <h4>{name}</h4>
        </div>
      </Link>
  )
}

export default CategoryTile;
