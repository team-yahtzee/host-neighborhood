// import  GoogleMapReact from 'google-map-react';
import { key } from "../../../../config.js" 
import React from "react";
import GoogleMapReact from "google-map-react";
import "babel-polyfill";

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  // returns simple google map 
  render() {
    let coords = this.props.location;
    return (
      <div className="mapContainer">
        <GoogleMapReact
          bootstrapURLKeys={{ key: key }}
          
          // default is neccessary for it to work 
          defaultCenter={{ lat: 21.1744336, lng: 72.7954677 }}
          center={coords}
          zoom={13}
          yesIWantToUseGoogleMapApiInternals={true}
        />
        <span>
          {" "}
          Exact location information is provided after a booking is confirmed.{" "}
        </span>
      </div>
    );
  }
}

export default MapContainer;
