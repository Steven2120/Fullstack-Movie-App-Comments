//imports react and items from react-router-dom and nav.css
import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Nav.css";

export class Nav extends Component {
  //renders the following jsx
  render() {
    console.log(this.props);
    return (
      <nav className="Navbar">
        <div className="h1-logo">
          <h1>
            <Link to="/">Movie with friends!</Link>
          </h1>
        </div>
        <div className="right-side-nav">
          <ul>
            <li>
              {/* if the following is true set link welcome back else sign up */}
              {this.props.user ? (
                <NavLink activeClassName="selected" to="/profile">
                  Welcome Back - {this.props.user.email}
                </NavLink>
              ) : (
                <NavLink activeClassName="selected" to="/sign-up">
                  Sign up
                </NavLink>
              )}
            </li>
            <li>
              {this.props.user ? (
                <NavLink
                  activeStyle={{ borderBottom: "1px solid white" }}
                  to="/"
                  onClick={this.props.handleUserLogout}
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  activeStyle={{ borderBottom: "1px solid white" }}
                  //to= takes you or redirects you to the following path
                  to="/login"
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Nav;
