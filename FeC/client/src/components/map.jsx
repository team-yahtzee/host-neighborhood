// import  GoogleMapReact from 'google-map-react';
import key from "../../../config.js";
import React from "react";
import axios from "axios";

import GoogleMapReact from 'google-map-react';
import "babel-polyfill";
// import "../style.css";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

 class MapContainer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
     
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }



  render() {
    let coords = this.props.location;
    return (
      <div className = "mapContainer">
        <GoogleMapReact
          bootstrapURLKeys={{ key: key }}
          defaultCenter={{ lat: 21.1744336, lng: 72.7954677 }}
          center={coords}
          zoom={13}
        >
        </GoogleMapReact>
       <span> Exact location information is provided after a booking is confirmed. </span>
  </div>
    );
  }
}

export default MapContainer;


// GoogleApiWrapper({
//   apiKey: key
// })(MapContainer);