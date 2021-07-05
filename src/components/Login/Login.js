//imports react and following items from validator and following items from react-toastify and the following items
import React, { Component } from "react";
import { isEmpty, isEmail } from "validator";
import { toast } from "react-toastify";
import Axios from "../utils/Axios";
import "./Login.css";
import jwtDecode from "jwt-decode";
import checkIfUserIsAuth from "../utils/checkIfUserIsAuth";

export class Login extends Component {
  //sets the default state with the following props to the following values
  state = {
    email: "",
    emailError: "",
    emailOnFocus: false,
    password: "",
    passwordError: "",
    passwordOnFocus: false,
    canSubmit: true,
  };

  //uses componentDidMount method and creates variable to checkIfUserIsAuth(). is user is authorized set history props with /movie
  componentDidMount() {
    let isAuth = checkIfUserIsAuth();

    if (isAuth) {
      this.props.history.push("/movie");
    }
  }

  //creates handler function that sets state of  [event.target.name]: event.target.value and a callback function that if the target is email and if email is empty set state let user know that email cannot be empty and set canSubmit to true else set emailerror to empty string
  handleOnChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        if (event.target.name === "email") {
          if (isEmpty(this.state.email)) {
            this.setState({
              emailError: "Email cannot be empty",
              canSubmit: true,
            });
          } else {
            this.setState({
              emailError: "",
            });
          }
        }

        //if target is password and if password is empty set state to notify that pass cannot be empty else set it to empty string

        if (event.target.name === "password") {
          if (isEmpty(this.state.password)) {
            this.setState({
              passwordError: "Password cannot be empty",
              canSubmit: true,
            });
          } else {
            this.setState({
              passwordError: "",
            });
          }
        }
      }
    );
  };

  //uses componentDidUpdate method and it prevState.canSubmit is true and if this.state.emailOnFocus && this.state.passwordOnFocus are both true and if this.state.emailError.length === 0 && this.state.passwordError.length === 0 are both true set state of canSubmit to false else cansubmit = true
  componentDidUpdate(prevProps, prevState) {
    if (prevState.canSubmit === true) {
      if (this.state.emailOnFocus && this.state.passwordOnFocus) {
        if (
          this.state.emailError.length === 0 &&
          this.state.passwordError.length === 0
        ) {
          this.setState({
            canSubmit: false,
          });
        } else {
          this.setState({
            canSubmit: true,
          });
        }
      }
    }
  }

  //creates handler function that if this.state[`${event.target.name}OnFocus`] is false set following state
  handleInputOnFocus = (event) => {
    if (!this.state[`${event.target.name}OnFocus`]) {
      this.setState({
        [`${event.target.name}OnFocus`]: true,
      });
    }
  };

  //creates handler function that uses event.preventDefault() and sets a variable to the following ajax call and following states and sets variable to the payload of result and another variable to the token.
  handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      let result = await Axios.post("/api/user/login", {
        email: this.state.email,
        password: this.state.password,
      });

      let jwtToken = result.data.payload;

      console.log(jwtToken);

      let decodedToken = jwtDecode(jwtToken);

      console.log(decodedToken);

      this.props.handleUserLogin(decodedToken);

      window.localStorage.setItem("jwtToken", jwtToken);

      toast.success("Login success!");
      this.props.history.push("/movie");
    } catch (e) {
      //if response.status === 429 set following error data else set following toast error payload
      if (e.response.status === 429) {
        toast.error(e.response.data);
      } else {
        toast.error(e.response.data.payload);
      }
    }
  };

  render() {
    const { email, emailError, password, passwordError, canSubmit } =
      this.state;

    //returns the following jsx
    return (
      <div className="container">
        <div className="form-text">Log in</div>

        <div className="form-div">
          <form className="form" onSubmit={this.handleOnSubmit}>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={this.handleOnChange}
                  onFocus={this.handleInputOnFocus}
                  autoFocus
                />
                <div className="errorMessage">{emailError && emailError}</div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onFocus={this.handleInputOnFocus}
                  onChange={this.handleOnChange}
                />
                <div className="errorMessage">
                  {passwordError && passwordError}
                </div>
              </div>
            </div>

            <div className="button-container">
              <button type="submit" disabled={canSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
