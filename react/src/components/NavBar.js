import React from 'react';
import { browserHistory, Link } from 'react-router';

const NavBar = props => {
  return(
    <div>
      <div className='top-bar bevelBox'>
        <div className='top-bar-title'>
          Pod
        </div>
        <div className='top-bar-section'>
          <Link to='/' className='link'>Home</Link>
          <Link to='/podcasts' className='link'>Subscriptions</Link>
          <Link to='/categories' className='link'>Categories</Link>
          <Link to='/search' className='link'>+</Link>
        </div>
      </div>
      {props.children}
      <div className='bottom-bar'>
        <div className="button bottom-bar-section" onClick={browserHistory.goBack} >
          Back
        </div>
      </div>
    </div>
  )
}

export default NavBar;

// <div className="dropdown">
//   <button className="dropbtn">+</button>
//   <div className="dropdown-content">
//     <Link to='/search/podcasts'>Search Podcasts</Link>
//     <Link to='/search/categories'>Search Categories</Link>
//   </div>
// </div>
