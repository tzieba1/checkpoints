import './App.css';
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar.js';
import About from './containers/About/About.js';
import Photos from './containers/Photos/Photos.js';
import Explore from './containers/Explore/Explore.js';
import Reports from './containers/Reports/Reports.js';

function App() {
  return (
    <div className="App">
      <NavigationBar />
        <Route exact path="/" render={() => (<Redirect to="/About" />)} />
        <Route path="/Photos" component={Photos} />
        <Route exact path="/Explore" component={Explore} />
        <Route exact path="/Reports" component={Reports} />
        <Route exact path="/About" component={About} />
        <br/>
        <hr/>
        <footer>&copy;&nbsp;2020&nbsp;|&nbsp;Tommy Zieba</footer>
    </div>
  );
}

export default App;
