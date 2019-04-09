import React from "react";
import MapContainer from "../components/map.jsx";
import faker from "faker";

class Neighborhood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingMoreRules: false,
      showingMorePolicies: false,
      showingMoreAboutNeighborhood: false
    };

    // these methods are responsible for slide-downs [e.g show more info]
    this.showMoreRules = this.showMoreRules.bind(this);
    this.showMorePolicies = this.showMorePolicies.bind(this);
    this.showMoreAboutNeighborhood = this.showMoreAboutNeighborhood.bind(this);

    this.showLessRules = this.showLessRules.bind(this);
    this.showLessPolicies = this.showLessPolicies.bind(this);
    this.showLessAboutNeighborhood = this.showLessAboutNeighborhood.bind(this);
  }

  showMoreRules() {
    this.setState({
      showingMoreRules: true
    });
  }

  showLessRules() {
    this.setState({
      showingMoreRules: false
    });
  }
  showMorePolicies() {
    this.setState({
      showingMorePolicies: true
    });
  }

  showLessPolicies() {
    this.setState({
      showingMorePolicies: false
    });
  }

  showMoreAboutNeighborhood() {
    this.setState({
      showingMoreAboutNeighborhood: true
    });
  }

  showLessAboutNeighborhood() {
    this.setState({
      showingMoreAboutNeighborhood: false
    });
  }
  render() {
    return (
      <div className="mainDivNeighborhood">
        <div style={{ marginTop: "-50px" }}>
          <h2> The neighborhood </h2>

          <span>
            {this.props.host.name}'s home is located in {this.props.host.city}.{" "}
          </span>

          <p>{this.props.host.neighborhoodDescr}</p>

          {/*  conditional rendering for more info */}
          {!this.state.showingMoreAboutNeighborhood ? (
            <span
              className="showMoreOrLess"
              onClick={this.showMoreAboutNeighborhood}
            >
              Read more about the neighborhood v <br />
            </span>
          ) : (
            <p>
              <span>
                <b>Getting around</b>
              </span>
              <br />
              <br />
              {this.props.host.locationsNearby.split(" ").map(place => {
                return (
                  <li>
                    {place} Overall-Time : {this.props.host.commuteTimeAvg}{" "}
                    minutes average price: {this.props.host.commutePriceAvg}{" "}
                    {this.props.host.localCurrency}{" "}
                  </li>
                );
              })}

              <br />

              <span
                className="showMoreOrLess"
                onClick={this.showLessAboutNeighborhood}
              >
                Hide ^
              </span>
            </p>
          )}

          <a href="#" className="showMoreOrLess">
            {" "}
            {this.props.host.name}'s Guides book
          </a>
        </div>

        <div>
          {/* part responsible for rendering map */}
          <div>
            <MapContainer
              className="mapContainer"
              location={this.props.location}
            />
          </div>

          <div className="cancelationsPolicies">
            <h2>Policies</h2>

            <h3>House rules</h3>

            <p>{this.props.host.policies}</p>

            {!this.state.showingMorePolicies ? (
              <span className="showMoreOrLess" onClick={this.showMorePolicies}>
                Read more about the policies v <br />
              </span>
            ) : (
              <p>
                {this.props.host.policies}
                <br />
                <span
                  className="showMoreOrLess"
                  onClick={this.showLessPolicies}
                >
                  Hide ^
                </span>
              </p>
            )}

            <h3>Cancellations</h3>

            {this.props.host.isCanc ? (
              <div>
                <span>
                  <b>Strict - Free cancellation for 48 hours</b>
                </span>
                <p>
                  After that, cancel up to 7 days before check-in and get a 50%
                  refund, minus the service fee.
                </p>
                {!this.state.showingMoreRules ? (
                  <span className="showMoreOrLess" onClick={this.showMoreRules}>
                    Read more about the rules v <br />
                  </span>
                ) : (
                  <div>
                    {this.props.host.neighborhoodDescr}
                    <br />
                    <span
                      className="showMoreOrLess"
                      onClick={this.showlessRules}
                    >
                      <a
                        className="showMoreOrLess"
                        href="https://www.airbnb.com/home/cancellation_policies?guest_fee_policy=grace_period_48_hours#strict-with-grace-period"
                      >
                        Learn more
                      </a>
                      <br />
                      Hide ^
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <span>Free cancellation at any time</span>
                {!this.state.showingMoreRules ? (
                  <span className="showMoreOrLess" onClick={this.showMoreRules}>
                    Read more about the rules v <br />
                  </span>
                ) : (
                  <div>
                    <br />
                    <span
                      className="showMoreOrLess"
                      onClick={this.showlessRules}
                    >
                      <a
                        className="showMoreOrLess"
                        href="https://www.airbnb.com/home/cancellation_policies?guest_fee_policy=grace_period_48_hours#strict-with-grace-period"
                      >
                        Learn more
                      </a>
                      <br />
                      Hide ^
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Neighborhood;
