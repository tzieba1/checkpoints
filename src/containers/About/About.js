import React from 'react';
import {Link} from 'react-router-dom';
import './About.css';

export default class About extends React.Component {
 constructor(props) {
   super(props);
   this.state = {};
 }

 componentDidMount() {

 }

 render() {
   return (
      <div className="About">
      <h1>Checkpoints &ndash; Ontario</h1>
        <p>This application implements the Bing Maps API using the "react-bingmaps" package installed with Node Package Manager. Users have access to open source data for Ontario's trails and parks via Node server API that queries an in-memory Sqlite3 database on port 3001.</p> 
        <p><Link to="/Explore">Explore</Link> the map and manage custom checkpoints.</p>
        <p>Add and view <Link to="/Photos">photos</Link> saved with pins representing checkpoints.</p>
        <p>View <Link to="/Reports">reports</Link> about checkpoint data.</p>
        <img src="" />
      </div>
    );
 }
}