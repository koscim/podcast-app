import React from 'react';
import { Link } from 'react-router';

const CategoryTile = props => {
  return (
      <Link to={`/categories/${props.id}`}>
        <div className='tile'>
          <p>{props.name}</p>
        </div>
      </Link>
  )
}

export default CategoryTile;
