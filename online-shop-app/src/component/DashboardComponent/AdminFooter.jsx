import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AdminFooter extends Component {
  render() {
    return (
      <footer className="main-footer" style={{ margin: "0" }}>
        <strong>
          Copyright &copy;
          <Link to="/contact">Team D </Link>.
        </strong>
        All rights reserved.
      </footer>
    );
  }
}
