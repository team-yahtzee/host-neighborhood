import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { key } from "../../config.js"

import Host from "./components/host.jsx";
import Neighborhood from "./components/neighborhood.jsx";
import '../dist/style.css'


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      host: {},
      location: {},
      showChat: false
    };
    this.getHost = this.getHost.bind(this);
    // this.getProperAddress = this.getProperAddress.bind(this);
  }

  componentDidMount() {
    this.getHost();
    document.addEventListener('mousewheel', {passive: true});
  }

  // grabs id from the current url
  getHost() {
    let id = window.location.href.split("/")[3];
    console.log(window.location.href.split('/'))
    axios
      .get(`/host/${id}`) // add absolute path to EC2 for deployment
      .then(host => {
        this.setState({
          host: host.data 
        }, () => {
          this.setState({location: this.state.host.location})
        });
      })
      .catch(err => {
        console.error(err);
      });
  }


  // from the input like '123 street-name ...'  return the address in coordinates
  // getProperAddress() {
  //   let address = this.state.location
  //   let parsedAddress = address.split(' ').join('+')
  //   axios
  //     .get(
  //       `https://maps.googleapis.com/maps/api/geocode/json?address=${address
  //         .split(" ")
  //         .join("+")}
  //         &key=${key}`
  //     )
  //     .then(result => {
  //       console.log(result)
  //       this.setState({
  //         location: result.data.results[0].geometry.location
  //       });
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }

  render() {
    return (
      <div>
        {console.log(this.state)}
        <Host host={this.state.host} />
        <br />
        <Neighborhood host={this.state.host} location={this.state.location}
        latitude={this.state.host.latitude} longitude={this.state.host.longitude} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

