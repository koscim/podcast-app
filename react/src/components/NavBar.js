import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
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

  render(){
    return(
      <div>
        <div className='top-bar bevelBox'>
          <div className='top-bar-title'>
            Pod
          </div>
          <div className='top-bar-section'>
            {!this.state.user ? <a href='/users/sign_in' className='link'>Sign In</a> : ""}
            {this.state.user ? <a href='/users/sign_out' data-method="delete" rel='nofollow' className='link'>Sign Out</a> : ""}
            {!this.state.user ? <a href='/users/sign_up' className='link'>Sign Up</a> : ""}
            <Link to='/' className='link'>Home</Link>
            <Link to='/podcasts' className='link'>Subscriptions</Link>
            <Link to='/categories' className='link'>Genres</Link>
            <Link to='/downtimes' className='link'>Downtimes</Link>
            <Link to='/search' className='link'>+</Link>
          </div>
        </div>
        {this.props.children}
        <div>
          <div className="button bottom-bar-section" onClick={browserHistory.goBack} >
            Back
          </div>
        </div>
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
