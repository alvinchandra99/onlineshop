import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "",
    };
  }
  handleClick(param, id) {
    document.getElementById(id).className += " active";
    for (let iter = 1; iter < 3; iter++) {
      if (iter === id) {
        continue;
      } else {
        document.getElementById(iter).className = "list-group-item";
      }
    }
    this.props.parentCallback(param);
  }
  logout() {
    localStorage.clear();
  }

  render() {
    return (
      <aside className="col-md-3">
        <nav className="list-group">
          <Link
            className="list-group-item"
            id="1"
            onClick={() => this.handleClick("myProfile", 1)}
          >
            Account Overview
          </Link>
          <Link
            className="list-group-item"
            id="2"
            onClick={() => this.handleClick("mySetting", 2)}
          >
            Settings
          </Link>
          <a onClick={this.logout} className="list-group-item" href="/">
            Log out
          </a>
        </nav>
      </aside>
    );
  }
}
