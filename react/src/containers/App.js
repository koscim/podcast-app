import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import PodcastsIndexContainer from './PodcastsIndexContainer';
import PodcastShowContainer from './PodcastShowContainer';
import EpisodeShowContainer from './EpisodeShowContainer';
import CategoriesIndexContainer from './CategoriesIndexContainer';
import CategoryShowContainer from './CategoryShowContainer';
import NavBar from '../components/NavBar';
import HomeShowContainer from'./HomeShowContainer';

const App = (props) => {
  return (
    <Router history={browserHistory} >
      <Route path='/' component={NavBar} >
        <IndexRoute component={HomeShowContainer} />
        <Route path="/users/:id" component={HomeShowContainer} />
        <Route path="/podcasts" component={PodcastsIndexContainer} />
        <Route path="/podcasts/:id" component={PodcastShowContainer} />
        <Route path="/podcasts/:id/episodes/:episode_id" component={EpisodeShowContainer} />
        <Route path="/categories" component={CategoriesIndexContainer} />
        <Route path="/categories/:id" component={CategoryShowContainer} />
      </Route>
    </Router>
  );
}

export default App;
