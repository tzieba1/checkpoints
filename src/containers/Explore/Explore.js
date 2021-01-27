import React from 'react';
import './Explore.css';
import { ReactBingmaps } from 'react-bingmaps';
// import Map from '../../components/Map/Map.js';
import {FilterForm} from '../../components/FilterForm/FilterForm.js';
import {AddPinForm} from '../../components/AddPinForm/AddPinForm.js';

export default class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bingMapKey: "Anl9koYsbzh0zEpnE0r-afdodoMYoGjgIJB1MrxL50khdH8gYgOLH56EoTxp69LY",
      pins: [], 
      parks: [], 
      trails: [], 
      clickedLocation: [50.0, -85.0],
      filterOptions: [
        "All Checkpoints", 
        "Active Checkpoints", 
        "Inactive Checkpoints"
        ]
      };
  }

  componentDidMount() {
    this.getPins();
    this.forceUpdate();
  }

  addPin = (event) => {
    event.preventDefault();
    // console.log(event);
    let state = event.target.form[3].checked ? event.target.form[3].value : event.target.form[4].value;
    fetch("http://localhost:3001/checkpointsApi?act=addPin" 
     + "&latitude=" + this.state.clickedLocation[1]
     + "&longitude=" + this.state.clickedLocation[0]
     + "&image=null"
     + "&date=" + new Date().toISOString()
     + "&description=" + event.target.form[1].value
     + "&state=" + state)
    .then(response => response.json())
    .then(
      (result) => {
        this.setState({addPinResult: result});
        this.getPins();
      },
      (error) => {console.log(error);this.setState({addPinResult: "Error adding new pin"});}
    );
  }
 
  getPins = (event) => {
    if(event) {event.preventDefault()};
    console.log(event);
    fetch("http://localhost:3001/checkpointsApi?act=getPins")
    .then(response => response.json())
    .then(
      (result) => {this.setState({pins: result, filterOptions: ["All Checkpoints", "Active Checkpoints", "Inactive Checkpoints"]});console.log(this.state.pins);},
      (error) => {console.log(error);this.setState({pins: "Error retrieving all pins"});}
    )
    .then(() => this.pushPins());
  }

  pushPins = () => {
    let pushPins = [];
    for(var i = 0; i < this.state.pins.length; i++) {
      pushPins.push({"location": [this.state.pins[i].longitude, this.state.pins[i].latitude], "option":{color: 'black'}});
    //"location":[50.0, -85.0], "option":{ color: 'red' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
    } 
    pushPins.push({"location": this.state.clickedLocation, "option":{color: 'red'}})
    this.setState({pushPins: pushPins});
    this.forceUpdate();
  }

   getParks = (event) => {
    event.preventDefault();
    fetch("http://localhost:3001/checkpointsApi?act=getParks")
    .then(response => response.json())
    .then(
      (result) => {
        let filterOpt = [];
        this.setState({parks: result});
        for(var i = 0; i < result.length; i++) {
          let name = `${result[i].name}`;
          let shortenedNames = name.substring(0, 30);
          filterOpt.push(shortenedNames);
        }
        this.setState({filterOptions: filterOpt});
        // console.log(this.state.parks);
        // console.log(filterOpt);
        // console.log(this.state.filterOptions);
      },
      (error) => {console.log(error);this.setState({parks: "Error retrieving all parks"});}
    )    
  }

  getTrails = (event) => {
    event.preventDefault();
    fetch("http://localhost:3001/checkpointsApi?act=getTrails")
    .then(response => response.json())
    .then(
      (result) => {
        let filterOpt = [];
        this.setState({trails: result});
        // console.log(this.state.trails);
        for(var i = 0; i < result.length; i++) {
          let name;
          if(result[i].name === undefined){
            // var onroad = result[i].onRoad ? "On Road" : "Not On Road";
            // name = `Trail Segment #${result[i].trailSegmentId} ${onroad}`;
          } else {
            name = `${result[i].name}`;
            let shortenedNames = name.substring(0, 50);
            filterOpt.push(shortenedNames);
          }        
        }
        this.setState({filterOptions: filterOpt});
      },
      (error) => {console.log(error);this.setState({trails: "Error retrieving all trails"});}
    );
  }

  filter = (event) => {
    event.preventDefault(); 
    // console.log(event);
    
  }

  getLocation = (location) => {
    var clickedLocation = [location["latitude"], location["longitude"]];
    this.setState({clickedLocation: clickedLocation});
    var temp = this.state.pushPins;
    temp[temp.length - 1] = {"location": clickedLocation, "option":{color: 'red'}}
    this.setState({pushPins: temp})
    this.pushPins();
    console.log(this.state.clickedLocation);
  }

  render() {
    return (
      <div className="Explore">
        <FilterForm 
          filterOptions = {this.state.filterOptions} 
          handleFilterSelect = {this.filter}
          handlePinsClick = {this.getPins}
          handleParksClick = {this.getParks}
          handleTrailsClick = {this.getTrails}
        />
        {/* <Map bingMapKey={this.state.bingMapKey} mapId={"exploreMap"} pins={this.state.pins} parks={this.state.parks} trails={this.state.trails}></Map> */}
        <div className="Map">
          <ReactBingmaps
            id = "myMap"
            bingmapKey = {this.state.bingMapKey}
            center = {[50.0, -85.0]}
            zoom = {5}
            getLocation = {{addHandler: "click", callback:this.getLocation}}
            pushPins = {this.state.pushPins}
            // polyline= {
            //   {"location": [[50.0, -85.0],[50.0, -84.0]],
            //   "option": { strokeColor: 'red', strokeThickness: 2 }
            // }}
          >
          </ReactBingmaps>
        </div>
        <AddPinForm handleSubmit={this.addPin} location={this.state.clickedLocation}/>
      </div>
    );
  }
}