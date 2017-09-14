import React from 'react';
import { browserHistory, Link } from 'react-router';

const NavBar = props => {
  return(
    <div>
      <div className='top-bar'>
        <div className='top-bar-title'>
          Pod
        </div>
        <div className='top-bar-section'>
          <Link to='/' className='link'>Home</Link>
          <Link to='/podcasts' className='link'>Podcasts</Link>
          <Link to='/categories' className='link'>Categories</Link>
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
