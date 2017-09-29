import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  componentDidMount() {
    fetch(`/api/v1/users/`, {
      credentials: 'same-origin'
    }).then(response => response.json())
    .then(responseBody => {
      this.setState({
        user: responseBody.current_user
      })
    })
    .catch((thing) => console.log("so sad"))
  }

  toggleMenu(){
    document.getElementById('toggle-mobile-menu').checked = false;
  }

  render(){
    return(
      <div>
        <div className='top-bar bevelBox'>
          <div className='top-bar-title'>
            Pod
          </div>
          <div className='top-bar-section' id="site-navigation" aria-label="Menu">
            <label htmlFor="toggle-mobile-menu" aria-label="Menu">&#9776;</label>
            <input id="toggle-mobile-menu" type="checkbox" />
            <ul id="main-menu">
              {!this.state.user ? <li><a href='/users/sign_in' className='link' onClick={this.toggleMenu}>Sign In</a></li> : ""}
              {this.state.user ? <li><a href='/users/sign_out' data-method="delete" rel='nofollow' className='link' onClick={this.toggleMenu}>Sign Out</a></li> : ""}
              {!this.state.user ? <li><a href='/users/sign_up' className='link' onClick={this.toggleMenu}>Sign Up</a></li> : ""}
              <li><Link to='/' className='link' onClick={this.toggleMenu}>Home</Link></li>
              <li><Link to='/podcasts' className='link' onClick={this.toggleMenu}>Subscriptions</Link></li>
              <li><Link to='/categories' className='link' onClick={this.toggleMenu}>Genres</Link></li>
              <li><Link to='/downtimes' className='link' onClick={this.toggleMenu}>Downtimes</Link></li>
              <li><Link to='/search' className='link' onClick={this.toggleMenu}>+</Link></li>
            </ul>
          </div>
        </div>
          {this.props.children}
      </div>
    )
  }
}

export default NavBar;

// <div className="dropdown">
//   <button className="dropbtn">+</button>
//   <div className="dropdown-content">
//     <Link to='/search/podcasts'>Search Podcasts</Link>
//     <Link to='/search/categories'>Search Categories</Link>
//   </div>
// </div>
