import React from "react";
import Movie from "../Test/Movie.jsx";
import "./style.css";
class Sam extends React.Component {
  getMovie = (name, link) => {
    return <Movie name={name} link={link} />;
  };
  render() {
    return (
      <div class="sec">
        {this.getMovie(
          "hello hi vinay",
          "https://gopink.in/images/home/Component%205.svg"
        )}
        {this.getMovie(
          "hello hi vina",
          "https://gopink.in/images/home/Component%205.svg"
        )}
      </div>
    );
  }
}
export default Sam;
