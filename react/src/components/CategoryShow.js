import React from 'react';
import { browserHistory, Link } from 'react-router';

const CategoryShow = (props) => {
  return(
    <div className="header-title">
      <h2 className="spaced">{props.name}</h2>
    </div>
  )
}

export default CategoryShow;
