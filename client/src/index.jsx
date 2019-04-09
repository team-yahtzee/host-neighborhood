import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import key from "../../config.js";

import Host from "./components/host.jsx";
import Neighborhood from "./components/neighborhood.jsx";
import "babel-polyfill";

import "./style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      host: {},
      location: {},
      showChat: false
    };
    this.getHost = this.getHost.bind(this);
    this.getProperAddress = this.getProperAddress.bind(this);
    // this.getPlacesNearby = this.getPlacesNearby.bind(this)
  }

  componentDidMount() {
     this.getHost();

  }

  getHost() {
      let id  = window.location.href.split('/')[3]
      axios.get(`/host/${id}`)
      .then(host => {
        this.setState(
          {
            host: host.data[0]
          }, ()=> this.getProperAddress(this.state.host.location))
      })
       .catch((err)=>{
        console.error(err)
      })
  }

  getProperAddress(address) {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address
          .split(" ")
          .join("+")}
          &key=${key}`
      )
      .then(result => {
        this.setState({
          location: result.data.results[0].geometry.location
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  // getPlacesNearby(){
  //   let coordinates = Object.values(this.state.location)
  //   axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates}&radius=1500&keyword=cruise&key=${key}`)
  //   .then((results) => {
  //     console.log(results)
  //   })
  //   .catch((err)=> console.error(err))
  // }

  render() {
    return (
      <div>
        <Host host={this.state.host} />
        <br />
        <Neighborhood host={this.state.host} location={this.state.location} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
