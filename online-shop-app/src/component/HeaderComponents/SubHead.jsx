import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class SubHead extends Component {
  loginButton = () => {
    if (localStorage.getItem("token") === null) {
      return (
        <NavLink className="btn btn-primary" exact to="/signin">
          Login
        </NavLink>
      );
    } else {
      return (
        <NavLink className="nav-link" to="/profile">
          Welcome,{" "}
          <strong>
            {localStorage.getItem("username") !== null
              ? localStorage.getItem("username")
              : "Guest"}
          </strong>
        </NavLink>
      );
    }
  };
  render() {
    return (
      <>
        <nav className="navbar navbar-main navbar-expand pl-0">
          <ul className="navbar-nav flex-wrap">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/product">
                Product
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ml-md-auto">
            <li className="nav-item">{this.loginButton()}</li>
          </ul>
        </nav>
      </>
    );
  }
}
