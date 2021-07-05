//imports react and the following items
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export class Movie extends Component {
  //sets default state to the following props with the following values
  state = {
    movie: "",
    movieArray: [],
  };

  //creates handler function that sets following state
  handleOnChange = (event) => {
    this.setState({
      movie: event.target.value,
    });
  };

  //function that sets variable to ajax call and sets state movieArray to result.data.Search
  onSubmit = async (event) => {
    try {
      let result = await axios.get(
        `https://omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API}&s=${this.state.movie}`
      );
      console.log(result);
      this.setState({
        movieArray: result.data.Search,
      });
      //catches error and logs it
    } catch (e) {
      console.log(e);
    }
  };

  //creates functional component that maps through movieArray and returns following jsx
  showMovieList = () => {
    return this.state.movieArray.map((item) => {
      return (
        <div
          key={item.imdbID}
          style={{
            width: 300,
            height: 300,
            marginRight: 25,
          }}
        >
          <Link
            style={{
              textDecoration: "none",
              color: "black",
              fontFamily: "monospace",
            }}
            to={{
              pathname: `/movie-detail/${item.Title}`,
              search: `?t=${item.Title}`,
            }}
          >
            <div>
              <img src={item.Poster} alt={item.Title} />
            </div>
            <div>
              Title: {item.Title}
              Year: {item.Year}
            </div>
          </Link>
        </div>
      );
    });
  };

  //renders following jsx
  render() {
    return (
      <div>
        <div
          style={{
            width: 500,
            margin: "0 auto",
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          <input
            type="text"
            placeholder="Search something..."
            name="movie"
            onChange={this.handleOnChange}
          />
          <button onClick={this.onSubmit}>Search</button>
        </div>
        <div
          style={{
            width: 1200,
            margin: "0 auto",
            textAlign: "center",
            marginTop: "50px",
            display: "flex",
          }}
        >
          {this.showMovieList()}
        </div>
      </div>
    );
  }
}
export default Movie;
