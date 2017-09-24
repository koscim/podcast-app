import React from 'react';
import { browserHistory, Link } from 'react-router';

const CategoryShow = (props) => {
  return(
    <div className="header-title">
      {props.name ? <h2>{props.name.toUpperCase()}</h2> : ""}
    </div>
  )
}

export default CategoryShow;
