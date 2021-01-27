import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavigationBar.css';

export default class NavigationBar extends React.Component {
 constructor(props) {
   super(props);
   this.state = {};
 }

 render() {
   return (
      <nav className="NavigationBar">
        <ul>
          <li>
            <img src={'/images/logoTitle.png'} alt="checkpointsTitle" width="200px"/>
          </li>
          <li>
            <NavLink 
              className="navLink" 
              activeClassName="navLinkActive" 
              id="explore" 
              exact 
              to="/Explore"
            >
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink 
              className="navLink"  
              activeClassName="navLinkActive" 
              id="photos" 
              exact 
              to="/Photos"
            >
              Photos
            </NavLink>
          </li>
          <li>
            <NavLink 
              className="navLink"  
              activeClassName="navLinkActive" 
              id="reports" 
              exact 
              to="/Reports"
            >
              Reports
            </NavLink>
          </li>
          <li>
            <NavLink 
              className="navLink" 
              activeClassName="navLinkActive" 
              id="about" 
              exact 
              to="/About"
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    );
 }
}