import React from 'react';
import { ReactBingmaps } from 'react-bingmaps';
import './Map.css';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      bingMapKey: "Anl9koYsbzh0zEpnE0r-afdodoMYoGjgIJB1MrxL50khdH8gYgOLH56EoTxp69LY"
    };
    this.setState({pins: this.props.pins, parks: this.props.parks, trails: this.props.trails});
  }

  render() {
    return(
      <div className="Map">
      <ReactBingmaps
        id = "myMap"
        bingmapKey = {this.state.bingMapKey}
        center = {[50.0, -85.0]}
        zoom = {5}
        disableStreetside = {true}
        mapOptions = {{"disableMapTypeSelectorMouseOver": true}}
        pushPins = {
          [
            {
              "location":[50.0, -85.0], "option":{ color: 'red' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
            }
          ]
        }
        polyline= {
          {"location": [[50.0, -85.0],[50.0, -84.0]],
          "option": { strokeColor: 'red', strokeThickness: 2 }
        }}
      >
      </ReactBingmaps>
    </div>
    );
  }
}