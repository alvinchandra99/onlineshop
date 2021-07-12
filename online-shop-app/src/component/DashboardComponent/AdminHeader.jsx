import React, { Component } from "react";
import { ReactComponent as Logo } from "../../logo.svg";
import { Link } from "react-router-dom";
import WidgetsItem from "../HeaderComponents/MainHeadComponents/WidgetsItem";
export default class AdminHeader extends Component {
  render() {
    return (
      <>
        <nav
          className="main-header navbar navbar-expand navbar-white navbar-light"
          style={{ margin: "0" }}
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/">
                <Logo />
              </Link>
            </li>
          </ul>
          <div className="col-sm-6"></div>
          <div
            className="col-xl-4 col-lg-4 col-md-6"
            style={{ float: "right" }}
          >
            <div className="widgets-wrap float-md-right">
              <WidgetsItem
                to="/roomlist"
                icon="fa fa-comment-dots"
                text="Message"
              />
            </div>
          </div>
        </nav>
      </>
    );
  }
}
