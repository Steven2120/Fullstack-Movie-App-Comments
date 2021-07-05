//imports react, toastContainer from react-toastify, jwt-decode, and mainRouter
import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import MainRouter from "./MainRouter";

import "./App.css";

export class App extends Component {
  //sets default state user to null
  state = {
    user: null,
  };

  //in the componentDidMount method we initiate getJwtToken and set a value of the jwt token from the local storage
  //if getjwttoken is true set a variable to the current date/time and also set a variable to jwtDecode(getJwtToken). if the token is expired log out if not login
  componentDidMount() {
    let getJwtToken = window.localStorage.getItem("jwtToken");
    if (getJwtToken) {
      const currentTime = Date.now() / 1000;
      let decodedJWTToken = jwtDecode(getJwtToken);
      if (decodedJWTToken.exp < currentTime) {
        //logout
        this.handleUserLogout();
      } else {
        //login
        this.handleUserLogin(decodedJWTToken);
      }
      // console.log("currentTime", currentTime);
      // June XXXX xxpm- 1624985322
      // ONE DAY FROM June XXXX xxpm - 1625071722
      // Current Time - 163500000
      // console.log("decodedJWTToken", decodedJWTToken);
    }
  }

  //function that sets state of user to user.email
  handleUserLogin = (user) => {
    this.setState({
      user: {
        email: user.email,
      },
    });
  };

  //handler function that removes token and sets state user to null
  handleUserLogout = () => {
    window.localStorage.removeItem("jwtToken");
    this.setState({
      user: null,
    });
  };

  //renders jsx
  render() {
    return (
      <>
        <ToastContainer position="top-center" />
        <MainRouter
          user={this.state.user}
          handleUserLogin={this.handleUserLogin}
          handleUserLogout={this.handleUserLogout}
        />
      </>
    );
  }
}
export default App;
