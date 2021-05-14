import * as React from "react";

class Movie extends React.Component {
  render() {
    return (
      <div class="sec1-card">
        <img src={this.props.link} />
        <label>{this.props.name}</label>
      </div>
    );
  }
}

export default Movie;
